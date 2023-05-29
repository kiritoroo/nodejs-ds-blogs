import React, { useEffect } from "react";
import { css } from "@emotion/css";

interface SingleHeadingData {
  title: string;
  id: string;
}
const useHeadingElements = () => {
  const [headingElements, setHeadingElements] = React.useState<Array<SingleHeadingData>>([]);
  React.useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>('[id^="toc"]'));
    const mappedHeadings: Array<SingleHeadingData> = [];
    elements.forEach((heading, index) => {
      const { innerText: title, id } = heading;

      mappedHeadings.push({ id, title });
    });
    setHeadingElements(mappedHeadings);
  }, []);

  return { headingElements };
};

const useIntersectionObserver = (setActiveId: any) => {
  const headingElementsRef = React.useRef<any>({});

  React.useEffect(() => {
    const callback = (headings: any) => {
      headingElementsRef.current = headings.reduce((map: any, headingElement: any) => {
        map[headingElement.target.id] = headingElement;
        return map;
      }, headingElementsRef.current);

      const visibleHeadings: any = [];
      Object.keys(headingElementsRef.current).forEach((key) => {
        const headingElement = headingElementsRef.current[key];
        if (headingElement.isIntersecting) visibleHeadings.push(headingElement);
      });

      const getIndexFromId = (id: any) => headingElements.findIndex((heading) => heading.id === id);

      if (visibleHeadings.length === 1) {
        setActiveId(visibleHeadings[0].target.id);
      } else if (visibleHeadings.length > 1) {
        const sortedVisibleHeadings = visibleHeadings.sort(
          (a: any, b: any) => getIndexFromId(a.target.id) > getIndexFromId(b.target.id)
        );
        setActiveId(sortedVisibleHeadings[0].target.id);
      }
    };

    const observer = new IntersectionObserver(callback, {
      rootMargin: "-50px 0px -40% 0px",
    });

    const headingElements = Array.from(document.querySelectorAll<HTMLElement>('[id^="toc"]'));
    headingElements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);
};

interface Props {

}

export const SidebarToc = (props: Props) => {
  const [activeId, setActiveId] = React.useState();
  const { headingElements } = useHeadingElements();
  useIntersectionObserver(setActiveId);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  return (
    <div className={sContainer}>
      <div className={sTocTitle}>Contens</div>
      <span className={sSpace}/>
      <ol className={sTocList}>
        {headingElements.map((heading, i) => (
          <li className={css([sTocItem, activeId == heading.id ? sTocItemSelected : null ])} key={i}>
            <a className={css([sTocLink, activeId == heading.id ? sTockLinkSelected : null ])}
              href={`#${heading.id}`}
              key={i}
              onClick={(e) => {
                e.preventDefault();
                document.querySelector(`#${heading.id}`)?.scrollIntoView({
                  behavior: "smooth",
                });
              }}
            >
              {heading.id.substring(3).replaceAll("_", " ")}
            </a>
          </li>
        ))}
      </ol>
    </div>
  )
}

const sContainer = css`
  position: sticky;
  top: 30px;
  border-radius: 12px;
  box-shadow: 0 2px 4px #4385bb12;
  padding: 20px 20px 25px;
  overflow: auto;
  background-color: #FFF;
`

const sTocTitle = css`
  font-size: 16px;
  font-weight: 700;
`

const sSpace = css`
  display: block;
  width: 1px;
  height: 0.2rem;
`

const sTocList = css`
  font-size: 14px;
  line-height: 1.5;
  position: relative;
  padding: 0;
  list-style: none;

  &::before {
    position: absolute;
    top: 17px;
    bottom: 8px;
    left: 5px;
    width: 2px;
    content: "";
    background: #e0efff;
    border-radius: 0 0 5px 5px;
  }
`

const sTocItem = css`
  position: relative;
  padding-left: 21px;
  margin-top: 5px;
  font-weight: 500;

  &::before {
    position: absolute;
    content: "";
    border-radius: 99rem;
    top: 4px;
    left: 0;
    width: 12px;
    height: 12px;
    background: #b0d3f9;
    border: 2px solid #fff;
  }
`

const sTocItemSelected = css`
  &::before {
    background-color: #3ea8ff;
    border-color: #e0efff;
  }
`

const sTocLink = css`
  position: relative;
  display: block;
  max-height: 3.05em;
  margin: 8px 0;
  overflow: hidden;
  color: #6e7b85;
  transition: none;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  text-decoration: none;
  text-underline-offset: 0.15em;
`

const sTockLinkSelected = css`
  color: #000000d1;
  font-weight: 600;
`