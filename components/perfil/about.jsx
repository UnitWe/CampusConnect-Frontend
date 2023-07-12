import { Link } from "lucide-react"
export default function about() {

    return (
        <div className="max-w-5xl m-auto">
            <div className="mb-6">
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has</p>
            </div>
            <div>
                <span className="mb-2">Sociais links</span>
                <ul>
                    <li className="flex items-center gap-1.5"><Link width={14}/> <a className="text-blue-500 hover:underline" href="#">https://twitter.com/i/flow/login?redirect_after_login=%2F</a></li>
                    <li className="flex items-center gap-1.5"><Link width={14}/> <a className="text-blue-500 hover:underline" href="#">https://medium.com/@polymathsomnath/about</a></li>
                    <li className="flex items-center gap-1.5"><Link width={14}/> <a className="text-blue-500 hover:underline" href="#">https://github.com/MarceloCoelho1</a></li>
                </ul>
            </div>
        </div>
    )
}