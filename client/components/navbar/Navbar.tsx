import Image from 'next/image';
import styles from './navbar.module.css';
import Link from 'next/link';
import { ThemeToggle } from '../themeToggle/ThemToggle';
import { AuthLinks } from '../authLinks/AuthLinks';



const Navbar = () => {
    return (
        <div className={styles.container}>
            <div className={styles.social}>                
                <Image src="/facebook.png" alt="facebook" width={24} height={24}/>
                <Image src="/tiktok.png" alt="tiktok" width={24} height={24}/>
                <Image src="/youtube.png" alt="youtube" width={24} height={24}/>
            </div>
            <div className={styles.logo}>ThangBlog</div>
            <div className={styles.links}>
                <ThemeToggle />
                <Link href="/">Homepage</Link>
                <Link href="/">Contact</Link>
                <Link href="/">About</Link>
                <AuthLinks />      
            </div>
        </div>
    )
}

export default Navbar