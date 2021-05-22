import React from "react"
import styled from "styled-components"

export const App = () => (
  <Container>
    <Heading>anttirautanen.com</Heading>
  </Container>
)

const Container = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: center;
  height: 50vh;
`

const Heading = styled.div`
  border-bottom: 1px solid #618985;
  border-top: 1px solid #618985;
  color: #618985;
  font-family: "Bungee Hairline", cursive;
  font-size: min(7vw, 64px);
  padding: 20px 0;
`
