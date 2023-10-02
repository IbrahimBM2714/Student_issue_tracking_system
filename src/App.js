import IssueForm from "./components/IssueForm";
import "./App.css";
import DisplayIssue from "./components/DisplayIssue";
import Root from "./components/Root";
import About from "./components/About";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import IssueDetails from "./components/IssueDetails";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route path="about" element={<About />} />
      <Route path="issue-form" element={<IssueForm />} />
      <Route path="display-issues" element={<DisplayIssue />} />
      <Route path="display-issues/:issue" element={<IssueDetails />} />
    </Route>
  )
);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
