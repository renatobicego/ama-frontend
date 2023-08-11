
import Home from "@/app/Home/Home";
import Loading from "./loading";
import { Suspense } from "react";

export default function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Home />
    </Suspense>
  )
}
