import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/login/login";
import Dashboard from "./components/dashboard/dashboard";
import Sidebar from "./components/sidebar/sidebar";
import ExpenseList from "./components/expense_list/expense_list";
import Users from "./components/users/users";
import Expense from "./components/expense/expense";
import Budget from "./components/budget/budget";
import "./index.css";

const Layout = ({ children }) => (
  <>
    <Sidebar />
    <main className="main--container">
      <div className="main--content">{children}</div>
    </main>
  </>
);

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/Dashboard"
            element={
              <Layout>
                <Dashboard />
              </Layout>
            }
          />
          <Route
            path="/Expense_list"
            element={
              <Layout>
                <ExpenseList />
              </Layout>
            }
          />
          <Route
            path="/Users"
            element={
              <Layout>
                <Users />
              </Layout>
            }
          />
          <Route
            path="/Expense"
            element={
              <Layout>
                <Expense />
              </Layout>
            }
          />
          <Route
            path="/Budget"
            element={
              <Layout>
                <Budget />
              </Layout>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
