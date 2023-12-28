using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Server.IIS.Core;
using ProAtividade.API.Models;
using ProAtividade.API.Repository;
using SQLitePCL;

namespace ProAtividade.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AtividadeController : ControllerBase
    {
        private readonly RepositoryContext context;

        public AtividadeController(RepositoryContext context)
        {
            this.context = context;
        }
        [HttpGet]
        public IEnumerable<Atividade> Get()
        {
            return context.Atividades;
        }

        [HttpGet("{id}")]
        public Atividade Get(int id)
        {
            return context.Atividades.FirstOrDefault(ati => ati.Id == id);
        }
        [HttpPost]
        public Atividade Post(Atividade atividade)
        {
            context.Atividades.Add(atividade);
            if (context.SaveChanges() > 0)
            {
                return context.Atividades.FirstOrDefault(a => a.Id == atividade.Id);
            }
            else
            {
                throw new Exception("Você não conseguiu adicionar atividade");
            }

        }
        [HttpPut("{id}")]
        public Atividade Put(int id, Atividade atividade)
        {
            if(atividade.Id != id )
            {
                throw new Exception("Você está tentando atualizar a atividade errada");
            }
            context.Update(atividade);
            if (context.SaveChanges() > 0)
            {
                return context.Atividades.FirstOrDefault(ati => ati.Id == id);
            }
            else
            {
                return new Atividade();
            }
            
        }
        [HttpDelete("{id}")]
        public bool Delete(int id)
        {
            var atividade = context.Atividades.FirstOrDefault(ati => ati.Id == id);
            if(atividade == null)
            {
                throw new Exception("Essa atividade não existe");
            }
            
            context.Remove(atividade);
            return context.SaveChanges() > 0;
        }
    }
}