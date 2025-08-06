
import './App.css'
import Swap from './Swap'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();  
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Swap />
    </QueryClientProvider>
  )
}

export default App
