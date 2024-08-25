import Navbar from '../components/navbar/Navbar';
import "./doordash.scss"

const Doordash = () => {
    return (
        <div className="doordash">
            <Navbar/>
            <div className="imageContainer"> 
                <img src="../images/doordash/Frame 27 (2).png" style={{ width: '75%', justifyContent: 'center', paddingLeft: '10vw' }} alt="Introduction" />
            </div>
            <div className="container">
                <h1>Introduction</h1>
                <p>
                While we could have chosen any of the numerous food delivery apps to focus on, we decided to focus on DoorDash due to <a href="https://www.businessofapps.com/data/food-delivery-app-market/"><span className="text-link">its large market share.</span></a> within the United States. We wanted to find ways to allow consumers to make <a href="https://aaptiv.com/magazine/food-delivery-apps-changing-eating-habits-worse/"><span className="text-link">healthier</span></a> since healthy isn't exactly the word that comes to mind when talking about food delivery. More specifically, we wanted to focus on a group of people that we felt weren't really having their needs met, which were people with dietary restrictions.
                <br /><br />
                This includes the millions of people who don't eat certain foods like pork due to <a href="https://www.mashed.com/1164703/the-mystery-of-why-billions-of-people-dont-eat-pork/"><span className="text-link">religious reasons,</span></a> as well as vegetarians and flexitarians, who make up <a href="https://ourworldindata.org/vegetarian-vegan"><span className="text-link">14%</span></a> of the population. And this number will only increase as movements like "Meatless Monday" become more popularized, and as we begin to further understand human implications in regards to climate change. We believe that by adding additional features like icons and increased filtering ability, it will not only benefit users with these types of restrictions but users in general to help them maintain healthy lives as well as help protect our environment.
                <br /><br />
                And this led to our main questions:
                <br /><br />
                </p>
                <h2 style={{ textAlign: 'center', fontSize: '20px', color: 'black' }}>In what ways can we help people with dietary restrictions: <br /><br /></h2>
                <ol className="b" style={{ color: 'red' }}>
                <li>Identify items that match their individual needs more efficiently</li>
                <li>Communicate their dietary restrictions to the restaurant effectively, so those ingredients can be excluded from their order</li>
                <li>Correctly get recommended food/restaurants that fit their needs</li>
                </ol>
                <p>
                <br /><br />
                <hr width="35%" size="5" align="center" color="#E3E2E2" />
                <br />
                <h2>And in order find the best solution possible, we: <br /><br /></h2>
                <ol className="b" style={{ color: 'green' }}>
                    <li><a href="#user">Performed user testing to understand pain points</a></li>
                    <li><a href="#competitiveaudit">Researched other competitive apps/companies</a></li>
                    <li><a href="#UXFlow">Designed a UX Flow</a></li>
                    <li><a href="#UISketch">Drew UI Sketches</a></li>
                    <li><a href="#prototype1">Created a low-fidelity prototype</a></li>
                    <li><a href="#prototype2">Completed a high-fidelity prototype</a></li>
                    <li><a href="#conclusion">Final thoughts</a></li>
                </ol>
                <br /><br />
                </p>
                <h1 id="user">1. Understanding the User</h1>
                <img src="../images/doordash/userdata.png" style={{ maxWidth: '550px', marginLeft: 'auto', marginRight: 'auto' }} alt="User Data" />
                <p>
                In our completed interviews with our 10 participants, we found that the majority had some difficulty in finding the types of food they wanted, whether it was having to do background research out of the app or choosing a different type of food entirely because they couldn’t find the food they initially wanted. Additionally, some other pain points that users mentioned was the lack of information on the restaurant page itself, which meant that they needed to selectively go into each restaurant page, search for the food, exit and repeat until they find a dish or restaurant that was suitable to their needs.
                <br /><br />
                Because of this, from our 10 users, 9 wanted additional features like more filters to make it easier to search for food within the main DoorDash page or throughout each restaurant's menu as well as features like icons next to food menu options to make it more efficient while scrolling without having to open each food description. This would speed up their searching process as well as give a better overview of what different food types contain like nuts, shellfish, chicken, and allow users to make more informed choices.
                <hr width="15%" size="5" align="center" color="#E3E2E2" />
                </p>
                <p>
                Now let's meet Esha Katri and Patrick Stone. Both two very different people with varying needs trying to accomplish the same goal of ordering the right food for their respective needs <i className="fa-solid fa-circle-arrow-right" style={{ display: 'inline-block' }}></i>
                <br /><br />
                </p>
                <img src="../images/doordash/Esha Persona.png" alt="Esha Persona" />
                <br /><br />
                <img src="../images/doordash/patrickpersona.png" alt="Patrick Persona" />
                <br /><br />
                <p>
                We can see that the current features of DoorDash do not sufficiently suffice their needs so what are features we need to add to solve this problem? Let's review what the problem statement is.
                <br /><br />
                </p>
                <hr width="100%" size="5" align="center" />
                <h1 style={{ textAlign: 'center' }}>The Problem Statement</h1>
                <p style={{ fontStyle: 'italic', fontWeight: '100', fontSize: '25px', lineHeight: '35px', textAlign: 'center', color: 'grey' }}>
                People with dietary restrictions need to be able to efficiently order food that matches their food restrictions in order to nourish their body during their busy life
                </p>
                <hr width="100%" size="5" align="center" />
                <br /><br />
                <h1 id="competitiveaudit">2. What about the competition?</h1>
                <br /><br />
                <p>
                Before I discuss the solution our team came up with, let's take a look at the competitive audit I compiled to see what other apps are doing that we might incorporate to extend DoorDash's existing features.
                </p>
                <img src="../images/doordash/competitiveaudit.png" alt="Competitive Audit" />
                <p>
                <br /><br />
                As seen from the chart, while DoorDash provides average amounts of information to users compared to other apps, it can still improve in its features regarding filtering ability and communicating allergen information to users. Additionally, in improving this, the "tags" feature can also be improved to be more refined allowing users to improve their ability to find food.
                <br />
                The final comment I have is that while the comment box is very standard across delivery apps, something that could be improved is creating an alert for users when restaurants manually check they have read the comments. This way, the user can be more reassured that their comments have been acknowledged to some degree. I will touch up on this more later.
                <br /><br />
                </p>
                <hr width="35%" size="5" align="center" />
                <h1 id="UXFlow">3. Where should we integrate the additional features?</h1>
                <br /><br />
                <img src="../images/doordash/UXFlow.png" alt="UX Flow" />
                <p>
                We made two previous possible UX Flows for where the dietary restrictions and allergen icon alert should be integrated into DoorDash's existing design and combined them together for this final flow. By adding these to DoorDash's existing overall design, we felt that this would be more intuitive for users to interact with.
                <br /><br />
                </p>
                <hr width="35%" size="5" align="center" />
                <h1 id="UISketch">4. What will the UI look like within DoorDash?</h1>
                <p>
                In order to get a better sense of what the UI design will look like before we prototype it in Figma, we sketched a couple of UI sketches, of what the integrated features would possibly look like within DoorDash.
                </p>
                <div className="image-container">
                <p style={{ paddingLeft: '15px', marginTop: '25px'}}>Sketch 1</p>
                <img src="../images/doordash/sketch1.png" className="image" alt="Sketch 1" />                </div>

                <div className="image-container">
                <p style={{ paddingLeft: '15px' }}>Sketch 2</p>
                <img src="../images/doordash/sketch2.png" className="image" alt="Sketch 2" />
                </div>

                <div className="image-container">
                <p style={{ paddingLeft: '15px' }}>Sketch 3</p>
                <img src="../images/doordash/sketch3.png" className="image" alt="Sketch 3" />
                </div>

                <hr width="35%" size="5" align="center" />
                <h1 id="prototype1">5. First Prototype</h1>
                <p>
                <br /><br />
                Taking in our users' needs like Esha and Patrick, along with the additional details we gathered from the competitive audit, as well as our user flow and sketches, we drafted a first prototype with 2 alternate UX Designs. The screens below are a combination of the 2 designs. We opted to go with the original DoorDash look, as well as incorporate bigger circle icons with images for the filter selection. We used a pull-up screen for the restaurant filter, and a separate screen during the menu process.
                </p>
                <div className="screencontainer">
                <img className="screen" src="../images/doordash/Home_v2-1.png" alt="Home Screen" />
                <img className="screen" src="../images/doordash/Selection.png" alt="Selection Screen" />
                <img className="screen" src="../images/doordash/Profile.png" alt="Profile Screen" />
                <img className="screen" src="../images/doordash/Profile-1.png" alt="Profile Screen 1" />
                </div>
                <hr width="35%" size="5" align="center" />
                <h1 id="prototype2">6. Final Prototype</h1>
                <br /><br />
                <p>
                Then after doing some brief user testing, we redesigned a few of the screens for the final high-fidelity prototype. Our final prototype included the improved filtering mechanisms as well as allergen icon usage to better communicate information to users. As the designer, I felt that the icons were intuitive, however realized this may not be the case for all users. To remedy this, I opted to add a 'legend' of sorts that would pop-up when a user clicks on an icon, giving users more information about each allergen icon.
                <br /><br />
                In addition, I decided to add another feature to the prototype to cover another pain point that was mentioned by Patrick which involved the comment box. If a restaurant has enabled an additional comments box and a user inputs something there, then the user will get an alert notifying them that the restaurant has received and 'read' the comment. This extra step may not completely fix the issue with allergen, but should be a step in the right direction to ease users' minds. Furthermore, this will also add some accountability to the restaurant as on their end they will have to manually click an option saying they have read the option. Since our design focuses on the user application side, we will not talk much more about the restaurant application usage.
                </p>
                <h2 style={{ textAlign: 'center', paddingBottom: '10px' }}> <br /><br />Dietary Filters & Icons  <br /><br /></h2>
                <div className="screencontainer" style={{ padding: '0' }}>
                <img className="highfid" src="../images/doordash/prototype1.gif" alt="High Fidelity Prototype 1" />
                <img className="highfid" src="../images/doordash/prototype2.gif" alt="High Fidelity Prototype 2" />
                </div>

                <div className="container2">
                <h2 style={{ textAlign: 'center', paddingBottom: '10px' }}> <br /><br />Allergen Alert  <br /><br /></h2>
                <img className="highfid" src="../images/doordash/Allergen Alert.png" style={{ maxWidth: '45%' }} alt="Allergen Alert" />
                </div>

                <hr width="35%" size="5" align="center" />
                <h1 id="conclusion">7. Finishing thoughts & Reflection</h1>
                <br /><br />
                <p>
                By adding these types of features like enhanced filtering ability, icons, and an alert system, not only will users with dietary restrictions be able to find the food they need more quickly, but it will also allow all users to gain a better understanding of what is in their food at a quick glance as opposed to reading a long description. Furthermore, by doing so, DoorDash can also enhance its search function as users can then search up keywords like pork or chicken, and get better restaurant and food recommendations.
                <br />
                Another key point to add is that with these features, users can better choose their meals to be healthier and also more environmentally-conscious. It's no secret that high meat consumption is bad for the environment and not very sustainable, but by making the process easier to find "meatless" meals, it could allow more consumers to partake instead of getting deterred by inaccurate recommendations or information.
                <br />
                Consumers deserve to know what goes in their food to make the most informed choice, and this can also help restaurants be more transparent about their ingredients, as well as increase accountability for food delivery interactions between restaurant and customer.
                <br /><br />
                </p>
                <hr width="35%" size="5" align="center" color="#E3E2E2" />
                <p style={{ paddingTop: '10px' }}>
                <br /><br />
                This was my first design case study and while it was kind of overwhelming to have to do so much in just 10 weeks, the short time period also meant that we had to stay on track and keep stricter deadlines. I definitely learned so much during these 10 weeks, and loved getting to learn more about Figma and using the prototypes feature. I also enjoyed gaining a deeper perspective of what a case study entails, and the different methods for conducting good user research and testing.
                <br />
                Big shout-out to my team and their work on this project, as well as the instructor and TAs for making this class possible!
                </p>
                <br /><br />
            </div>
      </div>
    )
};

export default Doordash