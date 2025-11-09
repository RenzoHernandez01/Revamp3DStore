import Image from "next/image";
import styles from './footerPanel.module.css'; 
import Link from 'next/link';
export default function FooterPanel() {
  return (
<div>
    <section className={`${styles.aboutSection}`}>
        <div className={`${styles.aboutDiv}`}>
            <ul className={`${styles.listClass}`}>
                <li>Company</li>
                <li>Help Center</li>
            </ul>
            <ul className={`${styles.listClass}`}>
                <li>Community</li>
                <li><Link href = "https://www.youtube.com/" target=" ">Youtube</Link></li>
                <li><Link href = "https://x.com/" target=" ">Twitter</Link></li>
                <li><Link href = "https://www.instagram.com/" target=" ">Instagram</Link></li>
                <li><Link href = "https://www.facebook.com/" target=" ">Facebook</Link></li>
            </ul>
            <ul className={`${styles.listClass}`}>
                <li>Legal</li>
                <li>Terms of Service</li>
                <li>Privacy Policy</li>
            </ul>
            <ul className={`${styles.listClass}`}>
                <li>Selling</li>
                <li>Open a Store</li>
                <li>Affiliats</li>
            </ul>
        </div>
    </section>
</div>
  );
}


 