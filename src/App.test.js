import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders test title", () => {
  render(<App />);
  const linkElement = screen.getByText(/hai/i);
  expect(linkElement).toBeInTheDocument();
  expect(linkElement).toHaveTextContent(/hai mark/i);
});
