'use client'
import Link from 'next/link'
import * as jose from 'jose'
import React, { useEffect } from 'react';
import Image from "next/image"
import Logo from "../public/images/logo.png"
import NullAvatar from "../public/images/avatarNull.png"

import { cn } from "@/lib/utils"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
    ListItem
} from "@/components/ui/navigation-menu"
import { OptionIcon } from 'lucide-react';



export default function header() {

    const [logged, setLogged] = React.useState(false)
    const [menu, setMenu] = React.useState(false)
    const [user, setUser] = React.useState('')
    const [profilePicUrl, setProfilePic] = React.useState(null)



    useEffect(() => {
        const verifyToken = async (token) => {
            try {
                const EncodedSecretKey = new TextEncoder().encode('asdsddasybudsa');
                const decoded = await jose.jwtVerify(token, EncodedSecretKey, { algorithms: ['HS256'] });
                setUser(decoded.payload.username)
                setLogged(true);
            } catch (e) {
                setLogged(false)

            }

        };

        const token = localStorage.getItem('token');
        const profile_pic_url = localStorage.getItem('profile_pic_url')


        if (profile_pic_url) {
            setProfilePic(profile_pic_url)
        }

        if (token) {
            verifyToken(token)
        }
    }, []);



    const handleLogout = () => {
        localStorage.clear()
        window.location.reload()
    }

    const components = [
        {
            title: "Alert Dialog",
            href: "/docs/primitives/alert-dialog",
            description:
                "A modal dialog that interrupts the user with important content and expects a response.",
        },
        {
            title: "Hover Card",
            href: "/docs/primitives/hover-card",
            description:
                "For sighted users to preview content available behind a link.",
        },
        {
            title: "Progress",
            href: "/docs/primitives/progress",
            description:
                "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
        },
        {
            title: "Scroll-area",
            href: "/docs/primitives/scroll-area",
            description: "Visually or semantically separates content.",
        },
        {
            title: "Tabs",
            href: "/docs/primitives/tabs",
            description:
                "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
        },
        {
            title: "Tooltip",
            href: "/docs/primitives/tooltip",
            description:
                "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
        },
    ]


    return (
        <header className=" bg-gray-dark fixed right-0 top-0 left-0 w-full border-b border-zinc-800  px-2 max-md:px-0">
            <div className="flex items-center px-2 max-w-7xl mx-auto h-14">
                <Link href="/">
                    <Image src={Logo} width={70} height={70} />
                </Link>

                <div className="mx-4">
                    <NavigationMenu>
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                                        <li className="row-span-3">
                                            <NavigationMenuLink asChild>
                                                <a
                                                    className="flex h-full w-full select-none flex-col transition-colors hover:bg-zinc-700 hover:text-zinc-200 justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                                                    href="/"
                                                >
                                                    <OptionIcon />
                                                    <div className="mb-2 mt-4 text-lg font-medium">
                                                        shadcn/ui
                                                    </div>
                                                    <p className="text-sm leading-tight text-muted-foreground">
                                                        Beautifully designed components built with Radix UI and
                                                        Tailwind CSS.
                                                    </p>
                                                </a>
                                            </NavigationMenuLink>
                                        </li>
                                        <ListItem href="/docs" title="Introduction">
                                            Re-usable components built using Radix UI and Tailwind CSS.
                                        </ListItem>
                                        <ListItem href="/docs/installation" title="Installation">
                                            How to install dependencies and structure your app.
                                        </ListItem>
                                        <ListItem href="/docs/primitives/typography" title="Typography">
                                            Styles for headings, paragraphs, lists...etc
                                        </ListItem>
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuTrigger>Components</NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                                        {components.map((component) => (
                                            <ListItem
                                                key={component.title}
                                                title={component.title}
                                                href={component.href}
                                            >
                                                {component.description}
                                            </ListItem>
                                        ))}
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <Link href="/docs" legacyBehavior passHref>
                                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                        Documentation
                                    </NavigationMenuLink>
                                </Link>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>

                <div className="flex items-center ml-auto">
                    {
                        logged ?
                            <div className="flex items-center h-100 ml-auto">
                                <a href="#" className="hidden max-md:block p-2">
                                    <svg className="fill-zinc-300" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="m18.031 16.617 4.283 4.282-1.415 1.415-4.282-4.283A8.96 8.96 0 0 1 11 20c-4.968 0-9-4.032-9-9s4.032-9 9-9 9 4.032 9 9a8.96 8.96 0 0 1-1.969 5.617zm-2.006-.742A6.977 6.977 0 0 0 18 11c0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7a6.977 6.977 0 0 0 4.875-1.975l.15-.15z"></path></svg>
                                </a>
                                <span className="ml-auto max-md:hidden">
                                    <Link href="/create_post" className='mr-2 whitespace-nowrap text-purple px-4 py-2 rounded border border-purple hover:bg-purple hover:text-white hover:underline'>Create Post</Link>
                                </span>
                                <a href="/notifications" className="mx-1 p-2 hover:bg-indigo-900/75 rounded">
                                    <svg className="fill-zinc-300" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" role="img" aria-labelledby="aobclc8t32pcofcuray898alv5kfn144" ><title id="aobclc8t32pcofcuray898alv5kfn144">Notifications</title>
                                        <path d="M20 17h2v2H2v-2h2v-7a8 8 0 1116 0v7zm-2 0v-7a6 6 0 10-12 0v7h12zm-9 4h6v2H9v-2z"></path>
                                    </svg>
                                </a>
                            </div> :
                            ""
                    }

                    <div>
                        {
                            logged ?
                                <div className='relative'>

                                    <button className="p-1" onClick={() => setMenu(!menu)}>
                                        <Image className="rounded-full" src={profilePicUrl ? profilePicUrl : NullAvatar} width={32} height={32} />
                                    </button>

                                    {
                                        menu ?
                                            <div className='absolute right-4 top-12 bg-gray-dark border border-zinc-700 rounded-lg py-2 px-2 w-max'>
                                                <ul>
                                                    <li className='px-2 text-sm rounded-lg duration-100 hover:bg-zinc-600/50'>
                                                        <a href="/" className='flex items-center gap-2 text-zinc-200 w-full py-2 '>
                                                            <svg aria-hidden="true" focusable="false" role="img" viewBox="0 0 16 16" width="16" height="16" fill="currentColor"><path d="M6.906.664a1.749 1.749 0 0 1 2.187 0l5.25 4.2c.415.332.657.835.657 1.367v7.019A1.75 1.75 0 0 1 13.25 15h-3.5a.75.75 0 0 1-.75-.75V9H7v5.25a.75.75 0 0 1-.75.75h-3.5A1.75 1.75 0 0 1 1 13.25V6.23c0-.531.242-1.034.657-1.366l5.25-4.2Zm1.25 1.171a.25.25 0 0 0-.312 0l-5.25 4.2a.25.25 0 0 0-.094.196v7.019c0 .138.112.25.25.25H5.5V8.25a.75.75 0 0 1 .75-.75h3.5a.75.75 0 0 1 .75.75v5.25h2.75a.25.25 0 0 0 .25-.25V6.23a.25.25 0 0 0-.094-.195Z"></path></svg>
                                                            {user ? user : ""}
                                                        </a>
                                                    </li>
                                                    <li className='px-2 text-sm rounded-lg duration-100 hover:bg-zinc-600/50'>
                                                        <Link href="/create_post" className='flex items-center gap-2 text-zinc-200 w-full py-2 '>
                                                            Publicar novo conteúdo
                                                        </Link>
                                                    </li>
                                                    <li className='px-2 text-sm rounded-lg duration-100 hover:bg-zinc-600/50'>
                                                        <a href={`/${user}`} className='flex items-center gap-2 text-zinc-200 w-full py-2 '>
                                                            Meus conteúdos
                                                        </a>
                                                    </li>
                                                    <li className='px-2 text-sm rounded-lg duration-100 hover:bg-zinc-600/50'>
                                                        <Link href="#" className='flex items-center gap-2 text-zinc-200 w-full py-2 '>
                                                            Editar perfil
                                                        </Link>
                                                    </li>
                                                    <li className='px-2 text-sm rounded-lg duration-100 hover:bg-red-700/25 '>
                                                        <button onClick={handleLogout} href="#" className='flex items-center text-red-500 gap-2 w-full py-2 '>
                                                            Deslogar
                                                        </button>
                                                    </li>

                                                </ul>
                                            </div> :
                                            ""
                                    }

                                </div>
                                :
                                <div className="flex gap-5 items-center">
                                    <Link href="/login" className='text-sm text-zinc-200 font-semibold hover:underline'>Login</Link>
                                    <Link href="/register" className='mr-2 whitespace-nowrap text-purple px-4 py-2 rounded border border-purple hover:bg-purple hover:text-white hover:underline'>Cadastrar</Link>
                                </div>
                        }

                    </div>
                </div>
            </div>
        </header>
    )
}
