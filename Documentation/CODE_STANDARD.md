# Code standard for SUVX

This is the code standard for the hardware portion of the Chas Challange 2025 project. In this document the code standard will be outlined and defined to some extent.

## Naming conventions

- **Functions:** camelCase
- **Namespaces:** camelCase
- **Variables:** snake_case

## Braces

Curly-brackets on the next row:

```cpp
void function()
{

}

void namespace::function()
{

}
```

## Indentation

4 spaces

## Headerfiles and sourcefiles

Class definitions will be written in a headerfile and there will one sourcefile containing all implementations.

The headerfiles will be stored in `include/`.

Source files will be stored in `src/`

## Classes and Namespaces

Procedural programming will be used.

The program will not use classes but namespaces and structs could be used.
