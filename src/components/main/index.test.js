import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Main from ".";
import * as UserServiceApi from "../../services/userServices";

jest.mock("../../services/userServices");

const usersData = {
  results: [
    {
      gender: "male",
      name: {
        title: "Mr",
        first: "Blake",
        last: "Wright",
      },
      location: {
        street: {
          number: 235,
          name: "Highbrook Drive",
        },
        city: "Nelson",
        state: "Auckland",
        country: "New Zealand",
        postcode: 30707,
        coordinates: {
          latitude: "53.2388",
          longitude: "-173.7105",
        },
        timezone: {
          offset: "+7:00",
          description: "Bangkok, Hanoi, Jakarta",
        },
      },
      email: "blake.wright@example.com",
      login: {
        uuid: "2fd06803-b4dd-4f33-bf72-8fb2cd201343",
        username: "heavydog560",
        password: "whiskey",
        salt: "Rs218noR",
        md5: "4a0425b87cff059cda2d17d3e0e97794",
        sha1: "88fb28c89161349527308f6365661ecea89c952a",
        sha256:
          "89d49859b740cfc6400e30a47682b7e33cd2d48f7b8e598d7ffd3918d1c9e68a",
      },
      dob: {
        date: "1998-04-24T07:29:04.072Z",
        age: 25,
      },
      registered: {
        date: "2016-10-29T21:51:08.305Z",
        age: 7,
      },
      phone: "(781)-012-2153",
      cell: "(899)-154-6666",
      id: {
        name: "",
        value: null,
      },
      picture: {
        large: "https://randomuser.me/api/portraits/men/14.jpg",
        medium: "https://randomuser.me/api/portraits/med/men/14.jpg",
        thumbnail: "https://randomuser.me/api/portraits/thumb/men/14.jpg",
      },
      nat: "NZ",
    },
  ],
};

beforeEach(() => {
  UserServiceApi.getUser.mockClear();
});

test("displays the profiles on page load", async () => {
  UserServiceApi.getUser.mockReturnValue(usersData);
  render(<Main />);
  const user = await screen.findByText("Mr Blake Wright");
  expect(user).toBeInTheDocument();
});

test("deletes the profile", async () => {
  UserServiceApi.getUser.mockReturnValue(usersData);
  render(<Main />);
  const deleteElement = await screen.findByRole("img", { name: /delete/i });
  fireEvent.click(deleteElement);
  expect(screen.queryByText("Mr Blake Wright")).not.toBeInTheDocument();
});

test("one click on add profile button adds(1) new profile ", async () => {
  UserServiceApi.getUser.mockReturnValue(usersData);
  render(<Main />);
  await waitFor(() =>
    expect(screen.getAllByText("Mr Blake Wright").length).toBe(1)
  );
  const addProfilesButton = screen.getByRole("button", {
    name: "Add Profile(s)",
  });
  fireEvent.click(addProfilesButton);
  await waitFor(() =>
    expect(screen.getAllByText("Mr Blake Wright").length).toBe(2)
  );
});
