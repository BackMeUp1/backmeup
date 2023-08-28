-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema backmeup
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema backmeup
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `backmeup` DEFAULT CHARACTER SET utf8mb3 ;
USE `backmeup` ;

-- -----------------------------------------------------
-- Table `backmeup`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `backmeup`.`users` (
  `iduser` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `password` LONGTEXT NOT NULL,
  `role` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`iduser`))
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `backmeup`.`projects`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `backmeup`.`projects` (
  `idprojects` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(45) NOT NULL,
  `description` LONGTEXT NOT NULL,
  `goal_amount` DECIMAL(10,2) NOT NULL,
  `current_amount` DECIMAL(10,2) NOT NULL,
  `is_approved` TINYINT NOT NULL,
  `start-date` DATE NOT NULL,
  `end-date` DATE NOT NULL,
  `comment` LONGTEXT NOT NULL,
  `image` LONGTEXT NOT NULL,
  `users_iduser` INT NOT NULL,
  PRIMARY KEY (`idprojects`, `users_iduser`),
  INDEX `fk_projects_users-account_idx` (`users_iduser` ASC) VISIBLE,
  CONSTRAINT `fk_projects_users-account`
    FOREIGN KEY (`users_iduser`)
    REFERENCES `backmeup`.`users` (`iduser`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `backmeup`.`pledges`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `backmeup`.`pledges` (
  `idpledges` INT NOT NULL AUTO_INCREMENT,
  `amount` DECIMAL(10,2) NOT NULL,
  `users_iduser` INT NOT NULL,
  `projects_idprojects` INT NOT NULL,
  PRIMARY KEY (`idpledges`, `users_iduser`, `projects_idprojects`),
  INDEX `fk_pledges_users-account1_idx` (`users_iduser` ASC) VISIBLE,
  INDEX `fk_pledges_projects1_idx` (`projects_idprojects` ASC) VISIBLE,
  CONSTRAINT `fk_pledges_projects1`
    FOREIGN KEY (`projects_idprojects`)
    REFERENCES `backmeup`.`projects` (`idprojects`),
  CONSTRAINT `fk_pledges_users-account1`
    FOREIGN KEY (`users_iduser`)
    REFERENCES `backmeup`.`users` (`iduser`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
