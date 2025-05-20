import {cleanup, render, screen} from "@testing-library/react";
import {describe, it, expect, afterEach} from "vitest";
import "@testing-library/jest-dom/vitest";
import ContactList from "./ContactList";
import {userEvent} from "@storybook/test";

describe("ContactList", () => {
    afterEach(cleanup);
    it("Renders the list",  () => {
        render(<ContactList attended={[
            { pic:"src/stories/assets/01.png", email: "Addyson@example.com", name: "Addyson Collier" },
            { pic:"src/stories/assets/02.png", email: "Edison@example.com", name: "Edison Khan" },
        ]} absent={[
            { pic:"src/stories/assets/03.png", email: "Mabel@example.com", name: "Mabel Benton" },
            { pic:"src/stories/assets/04.png", email: "Jamal@example.com", name: "Jamal Love" },
        ]} showEmails={false}/>);
        expect(screen.getByText("Addyson Collier")).toBeInTheDocument();
        expect(screen.queryByText('Addyson@example.com')).not.toBeInTheDocument();
    });

    it("Renders the list with e-mails",  () => {
        render(<ContactList attended={[
            { pic:"src/stories/assets/01.png", email: "Addyson@example.com", name: "Addyson Collier" },
            { pic:"src/stories/assets/02.png", email: "Edison@example.com", name: "Edison Khan" },
        ]} absent={[
            { pic:"src/stories/assets/03.png", email: "Mabel@example.com", name: "Mabel Benton" },
            { pic:"src/stories/assets/04.png", email: "Jamal@example.com", name: "Jamal Love" },
        ]}/>);
        expect(screen.getByText("Addyson Collier")).toBeInTheDocument();
        expect(screen.queryByText('Addyson@example.com')).toBeInTheDocument();
    });

    it("Can search", async () => {
        render(<ContactList attended={[
            { pic:"src/stories/assets/01.png", email: "Addyson@example.com", name: "Addyson Collier" },
            { pic:"src/stories/assets/02.png", email: "Edison@example.com", name: "Edison Khan" },
        ]} absent={[
            { pic:"src/stories/assets/03.png", email: "Mabel@example.com", name: "Mabel Benton" },
            { pic:"src/stories/assets/04.png", email: "Jamal@example.com", name: "Jamal Love" },
        ]}/>);
        expect(screen.getByText("Addyson Collier")).toBeInTheDocument();

        const searchQuery = screen.getByPlaceholderText('Search ...');
        await userEvent.type(searchQuery, 'dd', {
            delay: 500,
        });
        expect(screen.queryByText('Addyson Collier')).toBeInTheDocument();
        expect(screen.queryByText('Addyson@example.com')).toBeInTheDocument();
        expect(screen.queryByText('Edison Khan')).not.toBeInTheDocument();
        expect(screen.queryByText('Mabel Benton')).not.toBeInTheDocument();
        expect(screen.queryByText('Jamal Love')).not.toBeInTheDocument();
    });
});
