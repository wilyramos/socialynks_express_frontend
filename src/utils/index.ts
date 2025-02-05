export function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
} // function for conditional classes in tailwindcss components 
// Switch component from headlessui

// validate url 

export function isValidUrl(url: string) {
    try {
        new URL(url)
        return true
    } catch (error) {
        return false
    }
}