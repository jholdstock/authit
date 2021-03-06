import React, { useState } from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import Card from "./lib/Card";
import Button from "./lib/Button";
import FileInput from "./FileInput";

const Title = styled.h1`
  color: #3d5873;
  font-size: 2.25em;
`;

const Description = styled.p`
  color: #8997a5;
  font-size: 0.75em;
  max-width: 600px;
`;

const Form = styled.form`
  font-size: 18px;
  line-height: 1.5em;
  padding: 2em;
  text-align: center;
  max-width: 780px;

  @media (min-width: 768px) {
    text-align: left;
  }
`;

const SubmitWrapper = styled.div`
  width: 100%;
  text-align: center;
  @media (min-width: 768px) {
    text-align: right;
  }
`;

const TimestampForm = ({ history }) => {
  const [files, setFiles] = useState([]);
  const handleSubmit = e => {
    e.preventDefault();
    const digests = files.map(file => file.digest);
    const names = files.map(file => file.name);
    history.push(
      `results?digests=${digests.toString()}&names=${names.toString()}&timestamp=true`
    );
  };
  return (
    <Card>
      <Form>
        <Title>Timestamp</Title>
        <Description>
          The timestamp service allows you to create a Proof-of-Existence of a
          given file. A digital signature (digest) of each file is calculated
          and sent to the Dcrtime server which hourly will calculate the merkle
          root for all digests collected in the previous 60 minutes and store
          its value in the blockchain. <br /> The files you submit below will be
          verified against Dcrtime to find out if their digests are already in
          there or not. If the digest is not in Dcrtime, it will be uploaded and
          should be anchored within the next hour.
        </Description>
        <FileInput files={files} setFiles={setFiles} />
        {files && files.length ? (
          <SubmitWrapper>
            <Button onClick={handleSubmit} type="submit">
              Timestamp files
            </Button>
          </SubmitWrapper>
        ) : null}
      </Form>
    </Card>
  );
};

export default withRouter(TimestampForm);
