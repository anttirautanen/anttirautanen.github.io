import { createRoot } from "react-dom/client"
import { StrictMode } from "react"
import styled, { createGlobalStyle } from "styled-components"
import "normalize.css"

const GlobalStyle = createGlobalStyle`
body {
  background: radial-gradient(circle at center 33%, rgba(255, 136, 0, 1) 0%, rgba(232, 108, 0, 1) 100%);
}
`

const Container = styled.div`
  align-items: center;
  display: grid;
  grid-template-rows: 2fr 1fr;
  height: calc(100vh - 4rem);
  padding: 2rem;
`

const Heading = styled.h1`
  color: #ffe5b8;
  font-family: monospace;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-align: center;
  text-shadow: 0 0 1em rgba(255, 255, 0, 0.5);
`

const Surname = styled.span`
  color: #fff9f3;
`

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GlobalStyle />
    <Container>
      <Heading>
        antti<Surname>rautanen</Surname>.com
      </Heading>
    </Container>
  </StrictMode>
)
