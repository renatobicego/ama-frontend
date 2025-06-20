import { Typography } from "@/app/utils/materialTailwind"
import { InformationCircleIcon } from "@heroicons/react/24/outline"

const FormErrorMsg = ({formErrors}) => {
    return (
        <div>
            {formErrors.length > 0 && 

                formErrors.map((error, i) => 
                    <Typography  
                        variant="small" 
                        color="red" 
                        className="flex items-center gap-1 font-semibold mt-2"
                        key={i}
                        >
                        <InformationCircleIcon className="w-4 h-4 -mt-px" />
                        {error.msg}
                    </Typography>
                    
                )}
        </div>
    )
}

export default FormErrorMsg