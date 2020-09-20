import React, { useState } from "react";

import BarracasList from "../components/BarracasList";
import { Col, Input, InputGroup, InputGroupAddon, Row } from "reactstrap";

const Search = () => {
  const [query, updateQuery] = useState("");

  return (
    <div className="container-fluid">
      <Row>
        <Col>
          <div className="search">
            <InputGroup>
              <InputGroupAddon addonType="append"> Pesquisar </InputGroupAddon>
              <Input
                onChange={(e) =>
                  updateQuery(e.target.value.toLocaleLowerCase())
                }
                value={query}
              />
            </InputGroup>
          </div>
          <BarracasList search={query} />
        </Col>
      </Row>
      <style jsx>
        {`
          .search {
            margin: 20px;
            width: 500px;
          }
        `}
      </style>
    </div>
  );
};

export default Search;
