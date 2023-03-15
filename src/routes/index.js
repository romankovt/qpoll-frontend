import React from "react";
import { createBrowserRouter } from "react-router-dom";
import QPollList from "../components/QPollList";
import QPollShow from "../components/QPollShow";
import QPollEdit from "../components/QPollEdit.jsx";
import QPollNew from "../components/QPollNew.jsx";

const QPollRouter = createBrowserRouter([
  {
    path: "/",
    element: <QPollList />
  },
  {
    path: "/qpolls/:id",
    element: <QPollShow />,
    loader: async ({ params }) => {
      return fetch(`http://localhost:4200/v1/polls/${params.id}`);
    }
  },
  {
    path: "/qpolls/:id/edit",
    element: <QPollEdit />,
    loader: async ({ params }) => {
      return fetch(`http://localhost:4200/v1/polls/${params.id}`);
    }
  },
  {
    path: "/qpolls/new",
    element: <QPollNew />
  }
]);

export default QPollRouter;
