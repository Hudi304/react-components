import { FooterButton } from './footer-button'

type PageButtonProps = {
  numberOfPages: number
  onPageClick: any
  selectedPage: number
}

export function PageButtons({
  numberOfPages,
  onPageClick,
  selectedPage,
}: PageButtonProps) {
  function isBtnSelected(index: number) {
    return index === selectedPage
      ? 'shadow-md bg-gray-100 rounded-md cursor-default'
      : ''
  }

  const pageNumbersArray = Array.from(
    { length: numberOfPages },
    (_, i) => i + 1,
  )

  let middle: any = []
  if (selectedPage <= 3) {
    middle = pageNumbersArray.slice(0, 5)
  } else if (selectedPage >= numberOfPages - 2) {
    middle = pageNumbersArray.slice(numberOfPages - 5, numberOfPages)
  } else {
    middle = pageNumbersArray.slice(selectedPage - 3, selectedPage + 2)
  }

  switch (true) {
    case numberOfPages < 8:
      return (
        <div className='flex gap-3 buttons'>
          {pageNumbersArray.map((_, i) => {
            const index = i + 1
            return (
              <FooterButton
                key={`page-btn-${index}`}
                className={` ${isBtnSelected(index)}`}
                onClick={(e: any) => {
                  onPageClick(e, index)
                }}
              >
                {index}
              </FooterButton>
            )
          })}
        </div>
      )

    default:
      return (
        <div className='flex gap-3 buttons'>
          <FirstButtons />
          <MiddleButtons />
          <LastButtons />
        </div>
      )
  }

  function MiddleButtons() {
    return (
      <>
        {middle.map((value: number, i: any) => {
          return (
            <FooterButton
              key={`page-btn-${value}`}
              className={`${isBtnSelected(value)}`}
              onClick={(e: any) => {
                onPageClick(e, value)
              }}
            >
              {value}
            </FooterButton>
          )
        })}
      </>
    )
  }

  function FirstButtons() {
    if (numberOfPages - 1 <= 6) {
      return null
    }

    if (selectedPage === 4) {
      return <FooterButton>1</FooterButton>
    }
    if (selectedPage === 5) {
      return (
        <>
          <FooterButton
            onClick={(e: any) => {
              onPageClick(e, 1)
            }}
          >
            1
          </FooterButton>
          <FooterButton
            onClick={(e: any) => {
              onPageClick(e, 2)
            }}
          >
            2
          </FooterButton>
        </>
      )
    }

    if (selectedPage > 4) {
      return (
        <>
          <FooterButton
            onClick={(e: any) => {
              onPageClick(e, 1)
            }}
          >
            1
          </FooterButton>
          <FooterButton
            onClick={(e: any) => {
              onPageClick(e, 2)
            }}
          >
            2
          </FooterButton>
          ...
        </>
      )
    }

    return null
  }

  function LastButtons() {
    if (numberOfPages - 1 <= 6) {
      return null
    }
    if (selectedPage < numberOfPages - 4) {
      return (
        <>
          ...
          <FooterButton
            className={` ${isBtnSelected(numberOfPages - 1)}`}
            onClick={(e: any) => {
              onPageClick(e, numberOfPages - 1)
            }}
          >
            {numberOfPages - 1}
          </FooterButton>
          <FooterButton
            className={` ${isBtnSelected(numberOfPages)}`}
            onClick={(e: any) => {
              onPageClick(e, numberOfPages)
            }}
          >
            {numberOfPages}
          </FooterButton>
        </>
      )
    }

    if (selectedPage === numberOfPages - 4) {
      return (
        <>
          <FooterButton
            className={` ${isBtnSelected(numberOfPages - 1)}`}
            onClick={(e: any) => {
              onPageClick(e, numberOfPages - 1)
            }}
          >
            {numberOfPages - 1}
          </FooterButton>
          <FooterButton
            className={` ${isBtnSelected(numberOfPages)}`}
            onClick={(e: any) => {
              onPageClick(e, numberOfPages)
            }}
          >
            {numberOfPages}
          </FooterButton>
        </>
      )
    }

    if (selectedPage === numberOfPages - 3) {
      return (
        <FooterButton
          className={` ${isBtnSelected(numberOfPages)}`}
          onClick={(e: any) => {
            onPageClick(e, numberOfPages)
          }}
        >
          {numberOfPages}
        </FooterButton>
      )
    }

    return null
  }
}
