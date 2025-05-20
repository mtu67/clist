import {Meta, StoryObj} from "@storybook/react";
import { userEvent, within, expect } from '@storybook/test';
import ContactList from "../components/ContactList.tsx";

const attended = [
    { pic:"src/stories/assets/01.png", email: "Addyson@example.com", name: "Addyson Collier" },
    { pic:"src/stories/assets/02.png", email: "Edison@example.com", name: "Edison Khan" },
    { pic:"src/stories/assets/03.png", email: "Mabel@example.com", name: "Mabel Benton" },
];
const absent = [
    { pic:"src/stories/assets/06.png", email: "Kristian@example.com", name: "Kristian McKinney" },
    { pic:"src/stories/assets/07.png", email: "Gwendolyn@example.com", name: "Gwendolyn Parsons" },
    { pic:"src/stories/assets/08.png", email: "Lewis@example.com", name: "Lewis King" },
    { pic:"src/stories/assets/09.png", email: "Victoria@example.com", name: "Victoria Bryant" },
];

const meta = {
    title: "Example/ContactList",
    component: ContactList,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    args:{
        attended: attended,
        absent: absent,
    }
} satisfies Meta<typeof ContactList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Std: Story = {
    name: "Standard Full List",
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        await expect(canvas.queryByText('Addyson Collier')).toBeInTheDocument();
        await expect(canvas.queryByText('Addyson@example.com')).not.toBeInTheDocument();
    },
    args:{
        attended: attended,
        absent: absent,
        attendedCollapsed: false,
        absentCollapsed: false,
        showEmails: false,
    }
};

export const WithEmail: Story = {
    name: "List item email variant",
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        await expect(canvas.queryByText('Addyson Collier')).toBeInTheDocument();
        await expect(canvas.queryByText('Addyson@example.com')).toBeInTheDocument();
    },
    args:{
        attended: attended,
        absent: absent,
        attendedCollapsed: false,
        absentCollapsed: false,
        showEmails: true
    }
};

export const Collapsed: Story = {
    name: "Collapsed Section",
    args:{
        attended: attended,
        absent: absent,
        attendedCollapsed: false,
        absentCollapsed: true,
        showEmails: true
    }
};

export const Search: Story = {
    name: "Search Functionality",
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);

        const searchQuery = canvas.getByPlaceholderText('Search ...');
        await userEvent.type(searchQuery, 'dd', {
            delay: 500,
        });
        await expect(canvas.queryByText('Addyson Collier')).toBeInTheDocument();
        await expect(canvas.queryByText('Addyson@example.com')).toBeInTheDocument();
        await expect(canvas.queryByText('Edison Khan')).not.toBeInTheDocument();
    },
    args:{
        attended: attended,
        absent: absent,
        attendedCollapsed: false,
        absentCollapsed: false,
        showEmails: true
    }
};
