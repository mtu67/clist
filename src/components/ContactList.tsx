import {useState} from "react";
import Contact from "./Contact";
import {ContactProps} from "./Contact";
import styles from "./ContactList.module.css";

export interface ContactListProps {
    /** Contacts who attended */
    attended?: ContactProps[];
    /** Absent contacts */
    absent?: ContactProps[];
    /** Show emails? */
    showEmails?: boolean;
    /** Start with attended list collapsed */
    attendedCollapsed?: boolean;
    /** Start with absent list collapsed */
    absentCollapsed?: boolean;
}

/** List of Contacts. List of attended and absent contacts are specified as params. Also can specify if e-mails are displayed,
 *  and if attended / absent lists are collapsed. See the Storybook for some examples,
 *  and click 'Show code' in the stories to see how to use the component
 *  <br/>
 *  <b>Installation:</b> copy the following files to your components directory:
 *  Contact.module.css,
 *  Contact.tsx,
 *  ContactList.module.css,
 *  ContactList.tsx
 *  <br/>
 *  <b>Imports required:</b>
 *  <br/>
 *  import ContactList from "./components/ContactList";
 */
function ContactList({attended=[], absent=[], showEmails=true, attendedCollapsed=false, absentCollapsed=false}: ContactListProps) {
    if (attended == null) attended=[];
    if (absent == null) absent=[];
    const [searchQuery, setSearchQuery] = useState("");
    console.log("Rendering UL ... ", searchQuery);

    function getList(arr:ContactProps[]) {
        return <>{
                arr.map((c: ContactProps) =>
                !searchQuery || c.name?.toLowerCase().includes(searchQuery?.toLowerCase()) ?
                <Contact email={c.email} name={c.name} pic={c.pic} showEmail={showEmails}/> : <></>)
        }</>
    }

    return (
        <>
            <span className={styles.searchSpan}>
                <input type="search" placeholder="Search ..." className={styles.searchInput} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
            </span>

            <div>
                <details className={styles.details} open={!attendedCollapsed}>
                    <summary className={styles.summary}>
                        Attended
                        <span className={styles.arrow}>▼</span>
                    </summary>
                    <ul className={styles.peopleList}>
                        {getList(attended)}
                    </ul>
                </details>
            </div>
            <div>
                <details className={styles.details} open={!absentCollapsed}>
                    <summary className={styles.summary}>
                        Absent
                        <span className={styles.arrow}>▼</span>
                    </summary>
                    <ul className={styles.peopleList}>
                        {getList(absent)}
                    </ul>
                </details>
            </div>
        </>
    );
}

export default ContactList;
