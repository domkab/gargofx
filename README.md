# next-blog

project template

mock geo for eu countries
http://localhost:3000/?mockGeo=lt


theme Component - can be used if we want to have a theme light/dark on our app
use ENV variables to toggle: NEXT_PUBLIC_USE_THEME


dashboard variables for dark mode:

  for h1: text-gray-800 dark:text-gray-300
  for p: text-gray-600 dark:text-gray-300


for future, rendering credits multiline:

{post.credits?.split('\n').map((line, i) => (
  <p key={i}>{line}</p>
))}