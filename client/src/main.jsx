import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { UserContextProvider } from "./context/userContext.jsx";
import { TodoContextProvider } from "./context/TodoContext.jsx";
import { NoteContextProvider } from "./context/NoteContext.jsx";

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<UserContextProvider>
			<TodoContextProvider>
				<NoteContextProvider>
					<App />
				</NoteContextProvider>
			</TodoContextProvider>
		</UserContextProvider>
	</StrictMode>
);
