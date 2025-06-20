import { Spinner } from "@/app/utils/materialTailwind";

const LoadingError = ({loading, error}) => {
    if (loading) {
        return <div className="mt-6"><Spinner color="amber" /></div>;
    }
    if (error) {
        return <h3 className="text-text font-text">Error al cargar los datos</h3>;
    }
}

export default LoadingError