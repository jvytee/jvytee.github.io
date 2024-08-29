with import <nixpkgs> {};
mkShell {
  packages = [
    yaml-language-server
    zola
  ];
}
