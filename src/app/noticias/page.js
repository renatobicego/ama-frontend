import { Select, Option, Input, Button } from "@/app/utils/materialTailwind.js";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";


export default function Noticias(){
    return(
        <>
            <Header />
            <main className="pt-[15vh] lg:pt-44 2xl:pt-52 pb-20">
                <section className="size-section flex flex-col justify-between items-start gap-8 xl:mt-6">
                    <h2 className="text-title title-section">Últimas Noticias</h2>
                    <div className="flex justify-between gap-4 items-end !font-text">
                        <div className="flex relative w-full max-w-[24rem]">
                            <Input 
                                variant="standard" 
                                label="Buscar Noticias" 
                                size="lg"
                                color="gray"
                                className="indent-10 pr-96 text-text"
                                />  
                            <button className="!absolute right-0 top-4 rounded">
                                <img src="/icons/Search.svg"></img>
                            </button>
                        </div>
                        <Select
                            label="Categorías"
                            color="amber"
                            animate={{
                            mount: { y: 0 },
                            unmount: { y: 25 },
                            }}
                        >
                            <Option>Material Tailwind HTML</Option>
                            <Option>Material Tailwind React</Option>
                        </Select>
                        <Select
                            label="Filtros"
                            color="amber"
                            animate={{
                            mount: { y: 0 },
                            unmount: { y: 25 },
                            }}
                        >
                            <Option className="font-text">Material Tailwind HTML</Option>
                            <Option>Material Tailwind React</Option>
                        </Select>
                    </div>

                </section>
            </main>
            <Footer />
        </>
        
    )
}