import SidebarNav from "./sidebarNav"
import MyTags from "./tags"
export default function sidebarLeft() {
    return (
        <div className=" w-60">
            <aside>
                <SidebarNav/>
                <MyTags/>
            </aside>
        </div>
    )
}
