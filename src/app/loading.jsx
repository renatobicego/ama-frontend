import { Spinner } from "@/MT";

export default function Loading() {
    // You can add any UI inside Loading, including a Skeleton.
    return (
        <div className="bg-primary2 h-[100vh] w-[100vw] flex justify-center items-center">
            <Spinner color="amber" className="h-12 w-12 text-white"/>
        </div>
    )
}