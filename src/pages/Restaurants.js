import { useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

import harrogate from "../media/images/restaurants/harrogate.png";
import leeds from "../media/images/restaurants/leeds.png";
import knaresboroughCastle from "../media/images/restaurants/knaresborough-castle.png";

const Page = styled.div`
  position: relative;
  min-height: 80vh;
  display: grid;
  grid-template-columns: 260px 1fr;
  gap: 1rem;
  padding: 0.6rem 0 0 1rem;
  z-index: 0;


  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const Sidebar = styled.aside`
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  box-shadow: 10px 8px 18px rgba(0, 0, 0, 0.35);
  padding: 2rem;
  height: fit-content;
`;

const Title = styled.h2`
  margin: 0 0 0.6rem 0;
  color: #f5efe7;
  font-size: 1.2rem;
`;

const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const Item = styled.li`
  cursor: pointer;
  padding: 0.6rem 0.75rem;
  margin-bottom: 0.4rem;
  border-radius: 8px;
  color: #f3e6d3;
  transition: 0.2s ease;
  background: ${({ $active }) => ($active ? "rgba(97, 75, 52, .55)" : "transparent")};

  &:hover {
    background: rgba(97, 75, 52, 0.45);
    color: #c49a6c;
  }
`;

const RightPane = styled(motion.div)`
  min-height: 50vh;
  display: ${({ $intro }) => ($intro ? "flex" : "block")};
  align-items: ${({ $intro }) => ($intro ? "center" : "initial")};
  justify-content: ${({ $intro }) => ($intro ? "center" : "initial")};
  text-align: ${({ $intro }) => ($intro ? "center" : "initial")};
`;

const GlassCard = styled(motion.div)`
  width: min(80vw, 100%);
  padding: 0.2rem 2rem;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
  color: #28312c;
  box-shadow: 10px 8px 18px rgba(0, 0, 0, 0.6);

  h1 {
    margin: 1rem 0 0.5rem 0;
    color: #fff7ee;
    line-height: 1.5;
  }

  p {
    margin: 1rem;
    line-height: 2;
    color: #f2e7d6;
  }
`;

const RestaurantHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;

  img {
    width: 110px;
    height: 78px;
    object-fit: cover;
    border-radius: 10px;
    box-shadow: 8px 6px 8px rgba(0, 0, 0, 0.5);
  }

  h1 {
    margin: 0;
    color: #9b9585ff;
    font-size: 1.5rem;
  }

  h4 {
    margin: 0.2rem 0 0 0;
    color: #e9dcc7;
    font-weight: 500;
  }
`;

const Meta = styled.div`
  margin-top: 0.75rem;
  color: #f2e7d6;
  display: grid;
  gap: 0.25rem;
  font-size: 0.95rem;
`;

const ButtonRow = styled.div`
  margin-top: 0.9rem;
  display: flex;
  gap: 0.6rem;

  a,
  button {
    background: #614b34;
    color: #f8f1e8;
    border: none;
    padding: 0.5rem 0.8rem;
    border-radius: 8px;
    cursor: pointer;
    text-decoration: none;
    transition: 0.2s ease;
  }

  a:hover,
  button:hover {
    background: #c49a6c;
    color: #2b241d;
  }
`;

const Map = styled.iframe`
  width: 80vw;
  height: 54vh;
  border: 0;
  margin-top: 1rem;
  border-radius: 12px;
  box-shadow: 10px 8px 18px rgba(0, 0, 0, 0.45);
`;

const restaurants = [
  {
    id: 1,
    image: harrogate,
    name: "Harrogate",
    address: "2-4 Albert St, Harrogate HG1 1JG",
    phone: "+44 1403 123 456",
    hours: "Mon–Sat 7:30–18:00, Sun 9:00–17:00",
    mapEmbed:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2345.611440414997!2d-1.5385250999999998!3d53.9919218!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487953e0c2ab7f47%3A0x6bb5d1c06a4aeaae!2s2-4%20Albert%20St%2C%20Harrogate%20HG1%201JG%2C%20UK!5e0!3m2!1sen!2sus!4v1756824090014!5m2!1sen!2sus",
    bookingUrl: "/reservation-harrogate",
  },
  {
    id: 2,
    image: leeds,
    name: "Leeds",
    address: "1 Albion Pl, Leeds LS1 6JL",
    phone: "+44 1403 234 568",
    hours: "Mon–Sat 8:00–17:30, Sun 9:30–16:30",
    mapEmbed:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2356.521512015646!2d-1.5447505000000001!3d53.7980033!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48795c1bf8faf7ff%3A0x8190494f054cd486!2s1%20Albion%20Pl%2C%20Leeds%20LS1%206JL%2C%20UK!5e0!3m2!1sen!2sus!4v1756824416350!5m2!1sen!2sus",
    bookingUrl: "/reservation-leeds",
  },
  {
    id: 3,
    image: knaresboroughCastle,
    name: "Knaresborough Castle",
    address: "25 Castlegate, Knaresborough HG5 8AR",
    phone: "+44 1403 345 67",
    hours: "Daily 7:30–19:00",
    mapEmbed:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2344.7123765549736!2d-1.4678396999999996!3d54.007880699999994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4879520d004244ff%3A0xaaf95aebf57a43ea!2s25%20Castlegate%2C%20Knaresborough%20HG5%208AR%2C%20UK!5e0!3m2!1sen!2sus!4v1756824648969!5m2!1sen!2sus",
    bookingUrl: "/reservation-knaresborough",
  },
];

export default function Reservation() {
  const [selected, setSelected] = useState(null);

  return (
    <Page>
      {/* LEFT: LIST */}
      <Sidebar>
        <Title>Restaurants:</Title>
        <List>
          {restaurants.map((r) => (
            <Item
              key={r.id}
              onClick={() => setSelected(r)}
              $active={selected?.id === r.id}
            >
              {r.name}
            </Item>
          ))}
        </List>
      </Sidebar>

      {/* RIGHT: CENTERED WELCOME OR DETAILS + MAP */}
      <RightPane $intro={!selected}>
        <AnimatePresence mode="wait">
          {!selected ? (
            <GlassCard
              key="intro"
              initial={{ opacity: 0, y: 8, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -8, filter: "blur(6px)" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              style={{ maxWidth: 680, textAlign: "center" }}
            >
              <h1>
                Welcome to Bean & Brew Reservations
              </h1>
              <p>
                Pick a restaurant from the list to view address, opening times, and
                live map. You can then book directly from here.
              </p>
            </GlassCard>
          ) : (
            <GlassCard
              key={selected.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
            >
              <RestaurantHeader>
                <img src={selected.image} alt={selected.name} />
                <div>
                  <h1>{selected.name}</h1>
                  <h4>{selected.address}</h4>
                  <Meta>
                    <div>📞 {selected.phone}</div>
                    <div>🕒 {selected.hours}</div>
                  </Meta>
                  <ButtonRow>
                    <a href={selected.bookingUrl}>Reserve Now</a>
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                        selected.address
                      )}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Open in Maps
                    </a>
                  </ButtonRow>
                </div>
              </RestaurantHeader>

              <Map
                src={selected.mapEmbed}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                title={`${selected.name} map`}
              />
            </GlassCard>
          )}
        </AnimatePresence>
      </RightPane>
    </Page>
  );
}
