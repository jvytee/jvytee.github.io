with import <nixpkgs> {};

mkShell {
  packages = [
    nodejs
    zola
  ];
}
