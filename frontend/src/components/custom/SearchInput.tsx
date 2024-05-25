import React from 'react'

import { SearchIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    onSearchIconClick?: () => void;
  }

const separatePaddingClasses = (className: string | undefined) => {
  const inputClassesPrefixes = [
    'p-',
    'px-',
    'py-',
    'pl-',
    'pr-',
    'pt-',
    'pb-',
    'placeholder:',
  ]
  const bothElementsClassesPrefixes = ['bg-']

  const allClasses = className ? className.split(' ') : []

  const bothElementsClasses = allClasses.filter((currentClass) =>
    bothElementsClassesPrefixes.some((prefix) =>
      currentClass.startsWith(prefix),
    ),
  )

  const inputClasses = allClasses.filter((currentClass) =>
    inputClassesPrefixes.some((prefix) => currentClass.startsWith(prefix)),
  )

  const otherClasses = allClasses.filter(
    (currentClass) =>
      !inputClassesPrefixes.some((prefix) => currentClass.startsWith(prefix)),
  )

  return {
    inputClasses: [...inputClasses, ...bothElementsClasses].join(' '),
    otherClasses: [...otherClasses, ...bothElementsClasses].join(' '),
  }
}

const SearchInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, placeholder, onSearchIconClick, ...props }, ref) => {
    const { inputClasses, otherClasses } = separatePaddingClasses(className)

    return (
      <div
        className={cn(
          'relative flex rounded-lg border border-input bg-transparent pr-3 text-sm text-input shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-input-placeholder focus-within:border-primary focus:outline-none disabled:cursor-not-allowed disabled:opacity-50',
          otherClasses,
        )}
      >
        <button onClick={onSearchIconClick}>
          <SearchIcon className="absolute right-4 top-1/2 z-10 -translate-y-1/2 transform text-primary" />
        </button>
        <input
          type="text"
          placeholder={placeholder}
          className={cn(
            'w-full rounded-bl-lg rounded-tl-lg border-0 py-2.5 pl-3 outline-none',
            inputClasses,
          )}
          ref={ref}
          {...props}
        />
      </div>
    )
  },
)

export { SearchInput }
