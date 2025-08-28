import Image from "next/image";
import ContactForm from "@/components/ContactForm";
import SubscribeForm from "@/components/SubscribeForm";

export default function Home() {
  return (
    <>
      <div className="">
        <div className="px-[24px] lg:w-[984px] xl:w-[1160px] mx-auto">
          <div className="my-[24px] text-center">
            <img
              className="inline-block md:w-[626px] md:h-[419px] lg:h-[500px] lg:w-[747px]"
              src="https://img1.wsimg.com/isteam/stock/WVqjYgr/:/cr=t:0%25,l:0%25,w:100%25,h:100%25/rs=w:1252,h:838,cg:true"
              alt=""
            />
          </div>
          <div className="mb-[24px]">
            <div className="mb-[24px]">
              <p className="text-center text-[16px] leading-[1.25] font-[400]">
                Everything about pregnancy Journey, Motherhood & baby care: Dos
                and don'ts.
                <br />
                <br />
              </p>
            </div>
            {/* <div className="mx-[-12px] flex justify-center items-center">
              <a
                className="bg-[rgb(250,182,107)] text-black text-[14px] font-[700] tracking-[0.143em] w-[100%] md:w-auto py-[8px] px-[32px] min-h-[56px] flex justify-center items-center"
                href="/#0a817186-e965-4065-ad41-8790eb031a27"
              >
                SEND MESSAGE
              </a>
            </div> */}
          </div>
        </div>
        {/* what we do */}
        <section className="py-[32px] lg:w-[984px] xl:w-[1160px] mx-auto px-[24px] lg:px-[0px]">
          <h1 className="mb-[24px] leading-[1.4] tracking-[1px] text-[22px] font-[700] uppercase text-black">
            What we do
            <hr className="mt-[16px] border-[1px] border-black" />
          </h1>
          <div className="md:max-w-[50%]">
            <p className="pb-[48px]">
              <span>
                Relevant, personalized, positive, empowering, mumworld.in offer
                must-have information for every step of the pregnancy journey
                and about new born care. Founded in 2021, mumworld.in has
                publishing articles on various parenting topics and additional
                articles on parenting, the mental health of women.
              </span>
              <br />
              <span>
                The mumworld.in brand drives everything we do, and it's as
                powerful as it is simple: “healthy pregnancies and happy mother
                and healthy babies."
              </span>
            </p>
            <h4 className="mb-[16px] leading-[1.25] text-[22px] font-[400] text-[rgb(27,27,27)]">
              Pregnancy Health
            </h4>
            <p className="pb-[48px]">
              <span>
                Having a baby and pregnancy should be a positive experience, so
                our main focus is to give you helpful information. Pregnant
                women are bombarded with dos and don'ts. Here is help to keep it
                all straight.
              </span>
            </p>
            <h4 className="mb-[16px] leading-[1.25] text-[22px] font-[400] text-[rgb(27,27,27)]">
              Postpartum and Newborn Care
            </h4>
            <p className="pb-[48px]">
              <span>
                Our job isn’t done once delivery is over. Our team will post
                articles related to postpartum and newborn care.
              </span>
            </p>
          </div>
        </section>
        {/* Subscribe */}
        <section className="bg-[url(https://img1.wsimg.com/isteam/stock/NeWWRNm/:/rs=w:1534,m)] bg-no-repeat bg-cover">
          <div className="py-[32px] lg:w-[984px] xl:w-[1160px] mx-auto px-[24px] lg:px-[0px]">
            <h2 className="mb-[32px] text-[32px] text-[rgb(255,255,255)] leading-[1.2] font-[Cabin] tracking-[1px] text-center font-[700]">
              SUBSCRIBE
            </h2>
            <div className="max-w-[100%] md:max-w-[83.33%] lg:max-w-[66.66%] mx-auto">
              <p className="mb-[16px] font-[400] text-[rgb(255,255,255)] text-center leading-[1.5] text-[16px]">
                Sign up to hear more from us.
              </p>
              <SubscribeForm />
            </div>
          </div>
        </section>
        {/* Our team */}
        <section className="py-[32px] lg:w-[984px] xl:w-[1160px] mx-auto px-[24px] lg:px-[0px]">
          <div className="mb-[24px] text-center md:max-w-[50%] lg:max-w-[33.33%] mx-auto">
            <img
              className="inline-block"
              src="/shriti.webp"
              alt="Shriti Jha"
              width={342}
              height={342}
            />
            <h4 className="mb-[24px] text-center leading-[1.25] text-[22px] font-[400] text-[rgb(27,27,27)]">
              Meet Sriti
            </h4>
            <p className="text-center">
              I am a proud mama on a mission to sprinkle a little bit of magic
              into your daily routine through my humble corner of the internet,
              mumworld.in. Ever since I embarked on this journey of motherhood,
              I've been passionate about sharing my experiences, insights, and
              tips to make life a little bit sweeter for fellow moms like you.
              Here at mumworld.in, we're all about celebrating the chaos and
              beauty of motherhood. From diaper disasters to heartwarming
              milestones, I pour my heart into every post, hoping to inspire,
              uplift, and connect with each and every one of you. Whether it's
              sharing family-friendly recipes that even the pickiest eaters will
              love, offering practical parenting hacks to navigate the twists
              and turns of raising tiny humans, or simply creating a safe space
              where we can laugh, cry, and cheer each other on, I'm here to be
              your virtual cheerleader and confidante.
            </p>
            <a
              className="inline-block"
              href="https://www.linkedin.com/in/sriti-jha-93423b57/" target="_blank"
            >
              <img
                className="m-auto mt-4"
                src="/linkedin.png"
                alt="linkedin-profile"
                width="48"
                height="48"
              />
            </a>
          </div>
        </section>
        {/* contact us */}
        <section className="py-[32px] lg:w-[984px] xl:w-[1160px] mx-auto px-[24px] lg:px-[0px]">
          <h2 className="mb-[24px] leading-[1.4] tracking-[1px] text-[22px] font-[700] uppercase text-black">
            Contact us
            <hr className="mt-[16px] border-[1px] border-black" />
          </h2>
          <div className="flex flex-wrap justify-center lg:justify-between ">
            {/* Send message */}
            <div className="w-full lg:w-[487px]">
              <ContactForm />
            </div>
            {/* contact details */}
            <div className="mt-[40px] ">
              <div className="mb-[40px]">
                <p className="leading-[1.5] font-[400] flex flex-wrap text-[rgb(94,94,94)] text-center md:text-start text-[16px]">
                  Please contact us directly with any questions, comments, or
                  inquiries you may have. <br />
                  <br />
                </p>
                <p className="leading-[1.5] font-[400] text-[rgb(94,94,94)] text-center md:text-start text-[16px]">
                  Email id:{" "}
                  <a
                    className="underline text-[rgb(158,108,52)]"
                    href="mailto:mumworld.in@gmail.com"
                  >
                    mumworld.in@gmail.com
                  </a>
                </p>
              </div>
              <div className="mb-[40px]">
                <a
                  className="mb-[40px] w-fit px-[16px] py-[8px] bg-[rgb(69,90,100)] flex max-w-[80%] gap-5 md:max-w-[50%] min-h-[56px] mx-auto md:mx-0 items-center"
                  href="https://wa.me/918010213009"
                >
                  <img
                    className="w-[24px] h-[24px]"
                    src="/whatsapp.webp"
                    width={24}
                    height={24}
                    alt=""
                  />
                  <span className="text-[16px] text-white font-[700]">
                    Message us on Whatsapp
                  </span>
                </a>
                <h4 className="mb-[24px] leading-[1.25] text-[22px] font-[400] text-black text-center md:text-start">
                  mumworld.in
                </h4>
                <p className="mb-[24px] leading-[1.5] font-[400] text-[rgb(94,94,94)] text-[16px] text-center md:text-start">
                  Omicron II, Greater Noida, Uttar Pradesh, India
                </p>
                <p className="mb-[24px] text-center md:text-start text-wrap">
                  <a
                    className="w-[100%] block text-[rgb(158,108,52)] text-[16px] leading-[1.5] px-auto text-wrap break-words"
                    href="mailto:8010213009/mumworld.in@gmail.com"
                  >
                    8010213009/mumworld.in@gmail.com
                  </a>
                </p>
                <h4 className="mb-[24px] leading-[1.25] text-[22px] font-[400] text-black text-center md:text-start">
                  Hours
                </h4>
                <p className="text-center md:text-start">
                  <span className="leading-[1.5] font-[400] text-[rgb(94,94,94)] text-[16px]">
                    <strong className="font-[700]">Center Hours:</strong>
                    <br />
                    Monday - Friday: 9am - 5pm
                  </span>
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
