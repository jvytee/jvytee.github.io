import { Decrypter } from "https://esm.sh/age-encryption@0.2.0?exports=Decrypter";

export const decrypt = async () => {
    const urlSearchParams = new URLSearchParams(location.search);
    const passphrase = urlSearchParams.get("passphrase");
    if (passphrase === null) {
        return;
    }

    const decrypter = new Decrypter();
    decrypter.addPassphrase(passphrase);

    const main = document.getElementsByTagName("main")[0];
    const encoded = main.getElementsByTagName("p")[0].textContent;
    if (encoded === null) {
        return;
    }

    const decoded = Uint8Array.fromBase64(encoded);
    const decrypted = await decrypter.decrypt(decoded, "uint8array");
    const content = new TextDecoder().decode(decrypted);

    main.innerHTML = content;
}
