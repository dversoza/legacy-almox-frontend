import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

import Link from "next/link";

import {
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  Row,
  Col,
} from "reactstrap";

const QUERY = gql`
  {
    vendors {
      id
      active
      name
      manager
      contact
    }
  }
`;

function VendorsList(props) {
  const { loading, error, data } = useQuery(QUERY);
  if (error) return "Erro ao carregar lista de barracas.";
  // if vendors are returned from the GraphQL query, run the filter query
  // and set equal to variable VendorSearch
  if (loading) return <h1>Carregando...</h1>;
  if (data.vendors && data.vendors.length) {
    // searchQuery
    const searchQuery = data.vendors.filter((query) =>
      query.name.toLowerCase().includes(props.search)
    );
    if (searchQuery.length != 0) {
      return (
        <Row>
          {searchQuery.map((res) => (
            <Col xs="6" sm="4" key={res.id}>
              <Card style={{ margin: "0 0.5rem 20px 0.5rem" }}>
                <CardBody>
                  <CardTitle>Nome: {res.name}</CardTitle>
                  <CardText>Coordenador: {res.manager}</CardText>
                  <CardText>Telefone: {res.contact}</CardText>
                </CardBody>
                <div className="card-footer">
                  <Link
                    as={`/vendors/${res.id}`}
                    href={`/vendors?id=${res.id}`}
                  >
                    <a className="btn btn-primary">Ver mais</a>
                  </Link>
                </div>
              </Card>
            </Col>
          ))}

          <style jsx global>
            {`
              a {
                color: white;
              }
              a:link {
                text-decoration: none;
                color: white;
              }
              a:hover {
                color: white;
              }
              .card-columns {
                column-count: 3;
              }
            `}
          </style>
        </Row>
      );
    } else {
      return <h1>Barraca não encontrada</h1>;
    }
  }
  return <h5>Resultado da pesquisa</h5>;
}

export default VendorsList;
