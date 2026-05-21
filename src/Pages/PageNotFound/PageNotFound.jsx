import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import './PageNotFound.css'


function NotFound(){
    return(
     <div className="notfound">

            {/* TOP TEXT */}

            <motion.p
            className="top-text"

            initial={{
                opacity:0,
                y:-20
            }}

            animate={{
                opacity:1,
                y:0
            }}

            transition={{
                duration:0.7
            }}
            >
                SEEMS LIKE YOU ARE LOST
            </motion.p>

            {/* HUGE 404 */}

            <motion.h1

            initial={{
                opacity:0
            }}

            animate={{
                opacity:1
            }}

            transition={{
                duration:1
            }}

            >
                404
            </motion.h1>

            {/* FOOD IMAGE */}

    

            {/* BUTTON */}

            <Link to="/">

                <motion.button

                whileHover={{
                    y:-3
                }}

                whileTap={{
                    scale:0.95
                }}

                >
                    ← BACK TO HOME
                </motion.button>

            </Link>

        </div>

    )
}

export default NotFound;