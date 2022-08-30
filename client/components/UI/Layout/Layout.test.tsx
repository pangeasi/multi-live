import { describe, it, vi } from "vitest";
import { render, screen } from "utils/testUtils";
import Layout from ".";

beforeEach(async () => {
  vi.mock("next/head", () => ({
    __esModule: true,
    default: ({ children }: { children: Array<React.ReactElement> }) => {
      return <>{children}</>;
    },
  }));
});

describe("Layout", () => {
  it("should be render a component child", () => {
    render(<Layout>Hello</Layout>);

    expect(screen.getByText("Hello")).toBeInTheDocument();
  });

  it("should be show the title page correcty if pass a prop title", () => {
    render(<Layout title="test">Hello</Layout>);

    expect(document.title).toEqual("test");
  });

  it("should be show the default title page if not pass a prop title", () => {
    render(<Layout>Hello</Layout>);

    expect(document.title).toEqual("Multi live");
  });
});
