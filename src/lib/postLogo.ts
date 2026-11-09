// ───────────────────────────────────────────────────────────────────────────
// PRAVI LOGO (DF ikona iz navbara) ugradjen kao data URI.
// Uzet iz `public/images/logo-icon.png`, obrezan na sadrzaj i obojan u
// brend boju #4DEAE0 (ista boja kao u navbaru sajta).
// Ugradnja umjesto <img src> znaci: preuzeti/postavljeni SVG radi samostalno.
// ───────────────────────────────────────────────────────────────────────────

export const DF_LOGO_URI =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAAYCAYAAACvKj4oAAABm0lEQVR42uXXP2gUURDH8c8daxPQND6xkYdaamNlaWO9rZVVwEItFERshChYG0VBRGwsrCTwihRpgkTxH3Z2V+hiYbH+IYpJIbo2p4R4Re5yt7lbp9x9Mzvfnffm/aZVVZWtWF4Wu3HNeNrnbAhBduLUmAIutDXbFrK8LI5hxwDOaynEp2MM9wUPMlzHkQECvMWBMQa8kEL82sbrBm7NOynE+9DGwwaB/ep29DN/HmRYwhscnmCwn1jEbArx5foXWQqxysviNB6jVXNiFW7iw4D+q3iP5RTip14LMkghLudlMYsrNQO+SyGeG+UH/l70KcSreVlM4WKNldyfl8U9fOzT70UKcb4vwC7kpbwsXuEW9tYEOTNIl8SmAP9RMinERziI83jePcATaz21aApxFXOYy8tiGvuwZ8MPWZtYwA2wK1iZ1Ao2XWwbxrj0DXdrzvvJZhe2tjrw/g8VXD/dn8D0CPNdSiF2tg0Ql3FohIAn0dnOJnMUZ7sasXldNIX4PYV4G8fxo7HXRArxGW40rsn00Iu7hhyz06/Db4tRZXT54RWhAAAAAElFTkSuQmCC";

/** Odnos sirina/visina loga (za centriranje). */
export const DF_LOGO_RATIO = 2.3333;

/** Data URI loga — koristi se u SVG <image href="...">. */
export const DF_LOGO_DATA_URI = DF_LOGO_URI;
