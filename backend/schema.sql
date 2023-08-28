-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema backmeup
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema backmeup
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `backmeup` DEFAULT CHARACTER SET utf8 ;
USE `backmeup` ;

-- -----------------------------------------------------
-- Table `backmeup`.`pledges`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `backmeup`.`pledges` (
  `idpledges` INT NOT NULL AUTO_INCREMENT,
  `amount` DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (`idpledges`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `backmeup`.`users-account`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `backmeup`.`users-account` (
  `iduser` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `password` LONGTEXT NOT NULL,
  `pledges_idpledges` INT NOT NULL,
  `admin_account_idadmin` INT NOT NULL,
  `role` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`iduser`, `pledges_idpledges`),
  INDEX `fk_users-account_pledges1_idx` (`pledges_idpledges` ASC) VISIBLE,
  CONSTRAINT `fk_users-account_pledges1`
    FOREIGN KEY (`pledges_idpledges`)
    REFERENCES `backmeup`.`pledges` (`idpledges`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


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
  `users-account_iduser` INT NOT NULL,
  `admin_account_idadmin` INT NOT NULL,
  `image` LONGTEXT NOT NULL,
  PRIMARY KEY (`idprojects`, `users-account_iduser`, `admin_account_idadmin`),
  INDEX `fk_projects_users-account_idx` (`users-account_iduser` ASC) VISIBLE,
  CONSTRAINT `fk_projects_users-account`
    FOREIGN KEY (`users-account_iduser`)
    REFERENCES `backmeup`.`users-account` (`iduser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;