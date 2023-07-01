export default function login(){
    return (
        <div className="flex items-center justify-center h-screen px-4">
            <div className=" max-w-xl mt-14"> 
                <form action="" className="flex flex-col gap-4 w-full">
                    <h1 className="font-semibold text-3xl">Login</h1>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="email">Email</label>
                        <input type="text" name="email" id="" className="px-2 h-11 rounded bg-black border border-zinc-700 focus:outline-none focus:border-purple focus:border-2"/>
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" id="" className="px-2 h-11 rounded bg-black border border-zinc-700 focus:outline-none focus:border-purple focus:border-2"/>
                    </div>             
                    <button className="text-sm h-11 rounded bg-bg-button-color">Login</button>
                </form>
                <div className="mt-10">
                    <div className="flex items-center justify-center text-sm gap-1">
                        <p className="">Novo no tabnews?</p>
                        <a href="" className=" text-blue-500 hover:underline"> Crie sua conta aqui.</a>
                    </div>
                    <div className="flex items-center justify-center text-sm gap-1">
                        <p className="">Esqueceu sua senha?</p>
                        <a href="" className=" text-blue-500 hover:underline"> Clique aqui.</a>
                    </div>
                </div>
                <div className="w-full h-0.5 bg-zinc-700 mt-8"></div>
                <div className="text-sm flex gap-5 items-center justify-center mt-8 flex-wrap">
                    <a href="#" className="text-blue-500 hover:underline">Contato</a>
                    <a href="#" className="text-blue-500 hover:underline">Github</a>
                    <a href="#" className="text-blue-500 hover:underline">Museu</a>
                    <a href="#" className="text-blue-500 hover:underline">RSSS</a>
                    <a href="#" className="text-blue-500 hover:underline">Sobre</a>
                    <a href="#" className="text-blue-500 hover:underline">Status</a>
                    <a href="#" className="text-blue-500 hover:underline">Termos de uso</a>
                </div>
            </div>
        </div>
    )
}