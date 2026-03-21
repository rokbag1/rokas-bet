import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Home from "./pages/Home";
import MainLayout from "./layouts/MainLayout";
import ProtectedRoute from "./routes/ProtectedRoute";
import DashboardLayout from "./layouts/DashboardLayout";
import LayoutUI from "@components/ui/LayoutUI";
import { ManagedUIContext } from "@lib/context/UiContext";
import MainDashboardPage from "@pages/Dashboard";
import TransactionsPage from "@pages/TransactionsPage";
import BetsPage from "@pages/BettingListPage";

function LangWrapper() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
      </Route>
      <Route
        path="dashboard/*"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<MainDashboardPage />} />
        <Route path="transactions" element={<TransactionsPage />} />
        <Route path="bets" element={<BetsPage />} />
      </Route>
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <ManagedUIContext>
        <LayoutUI />
        <Routes>
          <Route path="/:lng/*" element={<LangWrapper />} />
          <Route path="*" element={<LangWrapper />} />
        </Routes>
      </ManagedUIContext>
    </Router>
  );
}
export default App;
