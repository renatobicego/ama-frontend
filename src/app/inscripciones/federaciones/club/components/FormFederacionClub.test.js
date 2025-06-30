import "@testing-library/jest-dom/extend-expect";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import FormFederacionClub from "./FormFederacionClub";

describe("<FormFederacionClub />", () => {
  let formFederacionClub;

  beforeEach(() => {
    formFederacionClub = render(<FormFederacionClub />);
  });

  afterEach(() => {
    cleanup();
  });

  test("renders content", () => {
    expect(formFederacionClub.container).toMatchSnapshot();

    // Renders club input
    const clubInput = screen.getByLabelText("Nombre de Club*");
    expect(clubInput).toBeInTheDocument();

    // Renders submit button
    const submit = screen.getByText("Inscribir Club");
    expect(submit).toBeInTheDocument();
  });

  test("change input nombre club", () => {
    // Get nombre club input
    const clubInput = screen.getByLabelText("Nombre de Club*");

    // Change input
    fireEvent.change(clubInput, { target: { value: "test" } });

    expect(clubInput.value).toBe("test");
  });
});
