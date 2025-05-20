import styles from "./Contact.module.css"

export interface ContactProps {
    /** E-mail address*/
    email?: string;
    /** Show email? */
    showEmail?: boolean;
    /** Name of the person */
    name?: string;
    /** Avatar (URL) */
    pic?: string;
}

function Contact({name,email,pic,showEmail=true} : ContactProps) {
    let p = null;
    if(showEmail && email){
        p = <p className={styles.infoP}>{email}</p>;
    }
    console.log("Rendering LI ... ", name);
    return <li className={styles.person}>
        <img src={pic} alt={name} className={styles.profilePic}/>
        <div className={styles.info}>
            <h2 className={styles.infoH2}>{name}</h2>
            {p}
        </div>
    </li>
}

export default Contact;