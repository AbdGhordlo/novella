/**
 * Static map from the coverImage string stored in the DB → the bundled asset.
 *
 * Metro resolves require() at BUILD TIME, so every path must be a literal
 * string — you cannot use a dynamic variable inside require().
 * This lookup map is the standard React Native pattern for dynamic local images.
 */
const coverMap: Record<string, ReturnType<typeof require>> = {
  "@/assets/images/book-covers/crime-and-punishment-cover.jpg": require("@/assets/images/book-covers/crime-and-punishment-cover.jpg"),
  "@/assets/images/book-covers/1984-cover.jpg": require("@/assets/images/book-covers/1984-cover.jpg"),
  "@/assets/images/book-covers/the-count-of-monte-cristo-cover.jpg": require("@/assets/images/book-covers/the-count-of-monte-cristo-cover.jpg"),
  "@/assets/images/book-covers/the-name-of-the-wind-cover.jpg": require("@/assets/images/book-covers/the-name-of-the-wind-cover.jpg"),
  "@/assets/images/book-covers/the-hobbit-cover.jpg": require("@/assets/images/book-covers/the-hobbit-cover.jpg"),
  "@/assets/images/book-covers/mistborn-cover.jpg": require("@/assets/images/book-covers/mistborn-cover.jpg"),
  "@/assets/images/book-covers/thinking-fast-and-slow-cover.jpg": require("@/assets/images/book-covers/thinking-fast-and-slow-cover.jpg"),
  "@/assets/images/book-covers/the-power-of-habit-cover.jpg": require("@/assets/images/book-covers/the-power-of-habit-cover.jpg"),
  "@/assets/images/book-covers/man-search-for-meaning-cover.jpg": require("@/assets/images/book-covers/man-search-for-meaning-cover.jpg"),
  "@/assets/images/book-covers/sapiens-cover.jpg": require("@/assets/images/book-covers/sapiens-cover.jpg"),
  "@/assets/images/book-covers/the-silk-roads-cover.jpg": require("@/assets/images/book-covers/the-silk-roads-cover.jpg"),
  "@/assets/images/book-covers/guns-germs-and-steel-cover.jpg": require("@/assets/images/book-covers/guns-germs-and-steel-cover.jpg"),
  "@/assets/images/book-covers/the-subtle-art-of-not-giving-a-fuck-cover.jpg": require("@/assets/images/book-covers/the-subtle-art-of-not-giving-a-fuck-cover.jpg"),
  "@/assets/images/book-covers/deep-work-cover.jpg": require("@/assets/images/book-covers/deep-work-cover.jpg"),
  "@/assets/images/book-covers/atomic-habits-cover.jpg": require("@/assets/images/book-covers/atomic-habits-cover.jpg"),
  "@/assets/images/book-covers/foundation-cover.jpg": require("@/assets/images/book-covers/foundation-cover.jpg"),
  "@/assets/images/book-covers/ender-game-cover.jpg": require("@/assets/images/book-covers/ender-game-cover.jpg"),
  "@/assets/images/book-covers/dune-cover.jpg": require("@/assets/images/book-covers/dune-cover.jpg"),
  "@/assets/images/book-covers/gone-girl-cover.jpg": require("@/assets/images/book-covers/gone-girl-cover.jpg"),
  "@/assets/images/book-covers/the-girl-with-the-dragon-tattoo-cover.jpg": require("@/assets/images/book-covers/the-girl-with-the-dragon-tattoo-cover.jpg"),
  "@/assets/images/book-covers/the-da-vinci-code-cover.jpg": require("@/assets/images/book-covers/the-da-vinci-code-cover.jpg"),
  "@/assets/images/book-covers/me-before-you-cover.jpg": require("@/assets/images/book-covers/me-before-you-cover.jpg"),
  "@/assets/images/book-covers/the-notebook-cover.jpg": require("@/assets/images/book-covers/the-notebook-cover.jpg"),
  "@/assets/images/book-covers/pride-and-prejudice-cover.jpg": require("@/assets/images/book-covers/pride-and-prejudice-cover.jpg"),
  "@/assets/images/book-covers/percy-jackson-cover.jpg": require("@/assets/images/book-covers/percy-jackson-cover.jpg"),
  "@/assets/images/book-covers/the-hunger-games-cover.jpg": require("@/assets/images/book-covers/the-hunger-games-cover.jpg"),
  "@/assets/images/book-covers/harry-potter-cover.jpg": require("@/assets/images/book-covers/harry-potter-cover.jpg"),
  "@/assets/images/book-covers/lord-of-the-mysteries-cover.jpg": require("@/assets/images/book-covers/lord-of-the-mysteries-cover.jpg"),
  "@/assets/images/book-covers/mother-of-learning-cover.jpg": require("@/assets/images/book-covers/mother-of-learning-cover.jpg"),
  "@/assets/images/book-covers/shadow-slave-cover.jpg": require("@/assets/images/book-covers/shadow-slave-cover.jpg"),
};

/**
 * Resolves a coverImage string from the DB to a bundled asset source.
 * Returns null if the path isn't found (renders the fallback placeholder).
 */
export function resolveCoverImage(
  coverImage: string | undefined | null,
): ReturnType<typeof require> | null {
  if (!coverImage) return null;
  return coverMap[coverImage] ?? null;
}
