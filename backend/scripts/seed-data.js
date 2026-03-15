/**
 * Adding initial/test data to the [worker] table.
 * Can be executed any number of times -> if you execute a second time, the 10 workers will be inserted again.
 */

import dotenv from 'dotenv';
dotenv.config()

const { default:pool } = await import('../src/config/db.js');

const seedData = async () => {
    try {
        await pool.query(`
            INSERT INTO worker (first_name, last_name, service, phone, gender, date_of_birth, description) VALUES
            ('Maria', 'Silva', 'Limpeza', '41900000000', 'Female', '1995-03-15', 'Profissional experiente em limpeza residencial e comercial. Trabalho com produtos ecológicos e tenho disponibilidade para trabalhar em finais de semana.'),
            ('João', 'Santos', 'Encanador', '41900000001', 'Male', '1988-07-22', 'Especialista em instalações hidráulicas, reparos de vazamentos e desentupimentos. Atendo emergências 24 horas.'),
            ('Ana', 'Oliveira', 'Manicure', '41900000002', 'Female', '1992-11-08', 'Manicure e pedicure profissional. Trabalho com esmaltação em gel, alongamento de unhas e nail art. Atendimento em domicílio disponível.'),
            ('Carlos', 'Souza', 'Professor Particular de Inglês', '41900000003', 'Male', '1990-05-12', 'Professor de inglês com certificação internacional. Aulas personalizadas para todos os níveis, preparação para TOEFL e conversação.'),
            ('Juliana', 'Costa', 'Cabeleireira', '41900000004', 'Female', '1994-09-30', 'Especializada em cortes modernos, coloração, mechas e tratamentos capilares. Trabalho com as melhores marcas do mercado.'),
            ('Pedro', 'Ferreira', 'Eletricista', '41900000005', 'Male', '1985-01-18', 'Eletricista residencial e comercial. Instalações elétricas, manutenção preventiva, automação residencial e energia solar.'),
            ('Camila', 'Rodrigues', 'Personal Trainer', '41900000006', 'Female', '1996-12-03', 'Personal trainer com foco em emagrecimento e hipertrofia. Treinos personalizados, acompanhamento nutricional e aulas online disponíveis.'),
            ('Rafael', 'Almeida', 'Desenvolvedor Web', '41900000007', 'Male', '1993-06-25', 'Desenvolvedor full-stack especializado em React, Node.js e PostgreSQL. Criação de sites, sistemas web e aplicativos.'),
            ('Beatriz', 'Martins', 'Fotógrafa', '41900000008', 'Female', '1991-04-17', 'Fotógrafa profissional especializada em eventos, ensaios e fotografia corporativa. Edição profissional inclusa nos pacotes.'),
            ('Lucas', 'Pereira', 'Mecânico', '41900000009', 'Male', '1987-08-09', NULL)
        `);
        
        console.log('✅ 10 workers inserted successfully!');
        process.exit(0); 
    } catch (error) {
        console.error('❌ Error inserting data:', error);
        process.exit(1);
    }
};

seedData();