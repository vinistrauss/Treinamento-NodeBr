CREATE TABLE TB_heroes(
    ID INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY NOT NULL,
    NOME TEXT NOT NULL,
    PODER TEXT NOT NULL
)

INSERT INTO TB_heroes(nome, poder) VALUES('Batman', 'Bilionário')

SELECT * FROM TB_heroes

UPDATE TB_heroes SET poder='rico'

DELETE FROM TB_heroes