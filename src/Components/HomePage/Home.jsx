import { useSelector } from 'react-redux'
import Post from '../PostPage/Post'
import Sidebar from '../Sidebar/Sidebar'
import style from './Home.module.css'

const arraylist=[
    {
        club:'NSS',
        images:'https://jamiasalafiyapharmacycollege.com/public/img/nss.jpg',
        comments:'I will never compromise on the values and principles that guide me as an NCC cadet'
    },
    {
        club:'NSS',
        images:'https://static.toiimg.com/thumb/msid-71027611,width-1280,resizemode-4/71027611.jpg',
        comments:'I will always be prepared, both mentally and physically, to serve my nation whenever called upon.'
    },
    {
        club:'NCC',
        images:'https://bsmedia.business-standard.com/_media/bs/img/article/2020-04/08/full/1586368068-6391.jpg',
        comments:'History of our diversified culture'
    }
    ,
    {
        club:'ECO',
        images:'https://i.ytimg.com/vi/IlGct62sLw8/hqdefault.jpg',
        comments:' uses 100% recycled plastics to make aesthetic, durable and environmentally friendly plastic lumber for use in applications ranging from fencing to landscaping'
    }
    ,
    {
        club:'Linux',
        images:'https://fosspost.org/wp-content/uploads/2020/03/linux-2025130_640.png.webp',
        comments:'usermod command followed by the -c (comment flag), then followed by the comment in quotes, and then specify the name of the user to add the comment in Linux.'
    }
    ,
    {
        club:'NSS',
        images:'https://ramanujancollege.ac.in/media/images/NSS-1.original.jpg',
        comments:'As an NCC cadet, I will learn to overcome fear and develop courage in the face of adversity.'
    }

]
export default function Home(){
    const user=useSelector((state)=>state.user.value)
    console.log(user.token)
    return(
        <div className={style.container}>
            <Sidebar/>
            <div className={style.Post}>
                {arraylist.map((clubs)=><Post clubs={clubs}/>)}
            </div>
            {/* <Post/> */}
        </div>
    )
}