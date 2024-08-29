use anchor_lang::prelude::*;

declare_id!("9biRqb4yyJZkcrsx6TWFxin5kkneNf1Pt5jzWWeSn7PT");

#[program]
pub mod favourites {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
