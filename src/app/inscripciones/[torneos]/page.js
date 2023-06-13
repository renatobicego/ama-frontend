import { Option, Select } from "@/app/utils/materialTailwind";


export default function InscripcionesTorneos(){
    return(
        <main className="pt-[17vh] lg:pt-44 2xl:pt-52 pb-20">
            <section className="size-section xl:mt-6">
                <h2 className="text-title title-section text-left">Inscripciones a Torneos</h2>
                <form className="w-2/3 mt-10">
                    <div className="flex w-full justify-between gap-6">
                        <Select color="gray" label="Torneo a Inscribirse*">
                            <Option>Torneo 1</Option>
                            <Option>Torneo 2</Option>
                        </Select>
                        <Select color="gray" label="Categoría*">
                            <Option>U14</Option>
                            <Option>U16</Option>
                            <Option>U18</Option>
                            <Option>U20</Option>
                            <Option>U23</Option>
                            <Option>Mayores</Option>
                            <Option>Masters</Option>
                        </Select>
                    </div>
                </form>
            </section>
        </main>
    )
}