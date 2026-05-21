import "./About.css";
import { motion } from "framer-motion";
import "./About.css";

function About() {
  return (
    < motion.div className="about"  initial={{ opacity: 0 }}   animate={{opacity: 1}}transition={{duration: 0.7}}>
      <motion.div className="about-container">

        {/* TOP SECTION */}
        <div className="about-top">
          <div className="about-img">
            <img
              src="https://images.unsplash.com/photo-1544005313-94ddf0286df2"
              alt="profile"
            />
          </div>

          <motion.div className="about-text">
            <h1>
              My name is Jane and I love to write about food.
            </h1>
          </motion.div>
        </div>

        {/* PARAGRAPH */}
        <motion.div className="about-content" initial={{ opacity: 0 }}   animate={{opacity: 1}}transition={{duration: 0.7}}>
          <p>
            I grew up in the countryside, Michigan to be exact, and my family
            always gathered together for mealtimes. We would cook together and
            my grandparents’ vegetable patch was the pride and joy of my
            grandmother.
          </p>

          <p>
            In my opinion, we should rethink our somewhat problematic
            relationship with food. At its best, it brings people together and
            nourishes our bodies. It shouldn’t be our enemy.
          </p>

            <p>
                I grew up in Michigan, where cooking and family meals shaped my love for food.
                To me, food is about connection and nourishment—it should bring us together, not work against us.
                I grew up in the countryside of Michigan, where family meals were always special. We cooked together, and my grandparents’ garden was my grandmother’s pride.
                I believe we should rethink our relationship with food. At its best, it brings people together and nourishes us—it should never feel like the enemy.
                
            </p>


        </motion.div>

        {/* BOTTOM IMAGE */}
        <motion.div className="about-bottom-img" initial={{ opacity: 0 }}   animate={{opacity: 1}}transition={{duration: 0.7}}>
          <img
            src="https://images.unsplash.com/photo-1509440159596-0249088772ff"
            alt="food"
          />
        </motion.div>

      </motion.div>
    </ motion.div>
  );
}

export default About;

